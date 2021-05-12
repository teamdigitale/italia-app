/* eslint-disable */

import { Mutex } from "async-mutex";
import { Function1, Lazy } from "fp-ts/lib/function";
import { fromNullable, none, Option } from "fp-ts/lib/Option";
import * as t from "io-ts";
import { IResponseType } from "italia-ts-commons/lib/requests";
import { Millisecond } from "italia-ts-commons/lib/units";
import { delayAsync } from "./timer";

const waitRetry = 8000 as Millisecond;
/**
 * Provides the logic for caching and updating a session token by wrapping
 * concurrent functions that need the token and may detect expired tokens.
 */
export class SessionManager<T> {
  private token?: T;
  private isSessionEnabled: boolean = true;
  private mutex = new Mutex();
  private isRefreshing: boolean = false;

  /**
   * Critical section:
   *
   * 1) Request (A) arrives and it needs to update the token, so it enters this
   *    section.
   * 2) While updating the token, another request arrives (B) that also sees the
   *    token is invalid and enters this section to update the token.
   * 3) (B) gets paused up since the mutex is locked by (A).
   * 4) (A) finishes updating the token with either a success or a failure.
   * 5) (B) gets resumed and could either find a valid token refreshed by (A)
   *    or a still invalid (undefined) token if (A)'s refresh failed.
   * 6) If the refresh failed, one or both (A) and (B) could retry the refresh
   *    again (depending on the state of their retry policy) and the flow starts
   *    again from (1)
   */
  private exclusiveTokenUpdate = async (forceUpdate = false) => {
    this.isRefreshing = this.token === undefined;
    await this.mutex.runExclusive(async () => {
      if (this.token === undefined || forceUpdate) {
        // token is not available, attempt to fetch a new token
        try {
          this.token = (await this.refreshSession()).toUndefined();
        } catch {
          // token is expired and we can't refresh, clear the current token
          // since it's useless.
          this.token = undefined;
        }
      }
      this.isRefreshing = false;
    });
    return this.token;
  };

  /**
   * if enabled is false it invalidates the session token
   * and sets a block to avoid to perform any token refreshing and
   * requests that need token
   *
   * if enable is true the block will be removed and token requesting
   * will be performed
   */
  private setEnabledSession = async (enabled: boolean) => {
    await this.mutex.runExclusive(() => {
      this.isSessionEnabled = enabled;
      if (!this.isSessionEnabled) {
        this.token = undefined;
      }
    });
  };

  /**
   * enable/disable to perform action that need token and token refreshing too
   */
  public setSessionEnabled = async (enabled: boolean) =>
    await this.setEnabledSession(enabled);

  constructor(
    private refreshSession: () => Promise<Option<T>>,
    private maxRetries: number = 0
  ) {}

  /**
   * Returns the current token, if there's one
   */
  public get = () => fromNullable(this.token);

  /**
   * Returns a new token
   */
  public getNewToken = async (): Promise<Option<T>> => {
    let count = 0;
    while (count <= this.maxRetries) {
      count += 1;
      await this.exclusiveTokenUpdate(true);
      if (this.token === undefined) {
        await delayAsync(waitRetry);
        continue;
      }
      return fromNullable(this.token);
    }
    return none;
  };

  /**
   * Returns a new function, with the same params of the provided function but
   * the first one, the token, that gets provided by the internal logic.
   */
  public withRefresh<R>(
    f: Function1<T, Promise<t.Validation<IResponseType<401, any> | R>>>
  ): Lazy<ReturnType<typeof f>> {
    return async () => {
      let count = 0;
      while (count <= this.maxRetries) {
        if (!this.isSessionEnabled) {
          throw new Error(
            "cant perform any requests cause the session is not enabled"
          );
        }
        count += 1;
        // FIXME remove this condition after cashback emergency https://www.pivotaltracker.com/story/show/176051000
        // this ensures that only a request at time could be done (if token is undefined)
        // ex: if a request is running (waiting for acquiring session token) no other requests will be processed
        // all other requests will fail
        if (this.isRefreshing) {
          throw new Error("max-retries");
        }
        await this.exclusiveTokenUpdate();
        if (this.token === undefined) {
          // if the token is still undefined, the refresh failed, try again
          // with a random delay to prevent the dogpile effect
          await delayAsync(waitRetry);
          // TODO: add customizable retry/backoff policy (https://www.pivotaltracker.com/story/show/170819459)
          continue;
        }
        const response = await f(this.token);
        // BEWARE: we can cast to any only because we know for sure that f will
        // always return a Promise<IResponseType<A, B>>
        if (response.isRight() && (response.value as any).status === 401) {
          // our token is expired, reset it
          // eslint-disable-next-line
          this.token = undefined;
          continue;
        }
        return response;
      }
      // max retries reached, reject the promise
      throw new Error("max-retries");
    };
  }
}
