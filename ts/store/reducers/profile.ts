/**
 * A reducer for the Profile.
 * It only manages SUCCESS actions because all UI state properties (like loading/error)
 * are managed by different global reducers.
 */
import { fromNullable, none, Option } from "fp-ts/lib/Option";
import * as pot from "italia-ts-commons/lib/pot";
import { NonEmptyString } from "italia-ts-commons/lib/strings";
import { createSelector } from "reselect";
import { getType } from "typesafe-actions";
import { EmailAddress } from "../../../definitions/backend/EmailAddress";
import { InitializedProfile } from "../../../definitions/backend/InitializedProfile";
import { capitalize } from "../../utils/strings";
import {
  profileLoadFailure,
  profileLoadRequest,
  profileLoadSuccess,
  profileUpsert,
  resetProfileState
} from "../actions/profile";
import { Action } from "../actions/types";
import { GlobalState } from "./types";

export type ProfileState = pot.Pot<InitializedProfile, Error>;

const INITIAL_STATE: ProfileState = pot.none;

// Selectors

export const profileSelector = (state: GlobalState): ProfileState =>
  state.profile;

export const isEmailEnabledSelector = createSelector(profileSelector, profile =>
  pot.getOrElse(
    pot.map(profile, p => p.is_email_enabled),
    false
  )
);

export const isInboxEnabledSelector = createSelector(profileSelector, profile =>
  pot.isSome(profile) && InitializedProfile.is(profile.value)
    ? profile.value.is_inbox_enabled
    : false
);

export const getProfileEmail = (
  user: InitializedProfile
): Option<EmailAddress> => fromNullable(user.email);

export const getProfileMobilePhone = (
  user: InitializedProfile
): Option<NonEmptyString> => fromNullable(user.spid_mobile_phone);

export const getProfileSpidEmail = (
  user: InitializedProfile
): Option<EmailAddress> => fromNullable(user.spid_email);

// return the email address (as a string) if the profile pot is some and its value is of kind InitializedProfile and it has an email
export const profileEmailSelector = createSelector(
  profileSelector,
  (profile: ProfileState): Option<string> =>
    pot.getOrElse(
      pot.map(profile, p => getProfileEmail(p)),
      none
    )
);

/**
 * Return the name of the profile if some, else undefined
 */
export const profileNameSelector = createSelector(
  profileSelector,
  (profile: ProfileState): string | undefined =>
    pot.getOrElse(
      pot.map(profile, p => capitalize(p.name)),
      undefined
    )
);

/**
 * The complete name + surname
 */
export const profileNameSurnameSelector = createSelector(
  profileSelector,
  (profile: ProfileState): string | undefined =>
    pot.getOrElse(
      pot.map(profile, p => capitalize(`${p.name} ${p.family_name}`)),
      undefined
    )
);

// return the spid email address (as a string)
export const profileSpidEmailSelector = createSelector(
  profileSelector,
  (profile: ProfileState): Option<string> =>
    pot.getOrElse(
      pot.map(profile, p => getProfileSpidEmail(p)),
      none
    )
);

// return the mobile phone number (as a string)
export const profileMobilePhoneSelector = createSelector(
  profileSelector,
  (profile: ProfileState): Option<string> =>
    pot.getOrElse(
      pot.map(profile, p => getProfileMobilePhone(p)),
      none
    )
);

// return true if the profile has an email
export const hasProfileEmail = (user: InitializedProfile): boolean =>
  user.email !== undefined;

// return true if the profile has an email
export const hasProfileEmailSelector = createSelector(
  profileSelector,
  (profile: ProfileState): boolean =>
    pot.getOrElse(
      pot.map(profile, p => hasProfileEmail(p)),
      false
    )
);

// return true if the profile has an email and it is validated
export const isProfileEmailValidated = (user: InitializedProfile): boolean =>
  user.is_email_validated !== undefined && user.is_email_validated === true;

// return true if the profile has version equals to 0
export const isProfileFirstOnBoarding = (user: InitializedProfile): boolean =>
  user.version === 0;

// return true if the profile pot is some and its field is_email_validated exists and it's true
export const isProfileEmailValidatedSelector = createSelector(
  profileSelector,
  (profile: ProfileState): boolean =>
    pot.getOrElse(
      pot.map(profile, p => hasProfileEmail(p) && isProfileEmailValidated(p)),
      false
    )
);

const reducer = (
  state: ProfileState = INITIAL_STATE,
  action: Action
): ProfileState => {
  switch (action.type) {
    case getType(resetProfileState):
      return pot.none;

    case getType(profileLoadRequest):
      return pot.toLoading(state);

    case getType(profileLoadSuccess):
      // Store the loaded Profile in the store
      return pot.some(action.payload);

    case getType(profileLoadFailure):
      return pot.toError(state, action.payload);

    //
    // upsert
    //

    case getType(profileUpsert.request):
      // eslint-disable-next-line
      return pot.toUpdating(state, action.payload as any);

    case getType(profileUpsert.success):
      if (pot.isSome(state)) {
        const currentProfile = state.value;
        const newProfile = action.payload;
        // The API profile is still absent
        if (
          !currentProfile.has_profile &&
          newProfile.has_profile &&
          isProfileFirstOnBoarding(newProfile)
        ) {
          return pot.some({
            ...currentProfile,
            has_profile: true,
            email: newProfile.email,
            is_email_enabled: newProfile.is_email_enabled === true,
            is_inbox_enabled: newProfile.is_inbox_enabled === true,
            is_email_validated: newProfile.is_email_validated === true,
            is_webhook_enabled: newProfile.is_webhook_enabled === true,
            preferred_languages: newProfile.preferred_languages,
            blocked_inbox_or_channels: newProfile.blocked_inbox_or_channels,
            accepted_tos_version: newProfile.accepted_tos_version,
            version: 0
          });
        }

        // We already have a API profile
        if (
          currentProfile.has_profile &&
          newProfile.has_profile &&
          currentProfile.version < newProfile.version
        ) {
          return pot.some({
            ...currentProfile,
            email: newProfile.email,
            is_inbox_enabled: newProfile.is_inbox_enabled === true,
            is_email_enabled: newProfile.is_email_enabled === true,
            is_email_validated: newProfile.is_email_validated === true,
            is_webhook_enabled: newProfile.is_webhook_enabled === true,
            preferred_languages: newProfile.preferred_languages,
            blocked_inbox_or_channels: newProfile.blocked_inbox_or_channels,
            accepted_tos_version: newProfile.accepted_tos_version,
            version: newProfile.version
          });
        }

        return state;
      } else {
        // We can't merge an updated profile if we haven't loaded a full
        // profile yet
        return state;
      }

    case getType(profileUpsert.failure):
      return pot.toError(state, action.payload);

    default:
      return state;
  }
};

export default reducer;
