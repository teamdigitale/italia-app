import { TaskEither, tryCatch } from "fp-ts/lib/TaskEither";
import * as React from "react";
import { Platform } from "react-native";
import ScreenBrightness from "react-native-screen-brightness";

const getBrightnessPlatform: () => Promise<number> = () =>
  Platform.select({
    ios: ScreenBrightness.getBrightness,
    default: ScreenBrightness.getAppBrightness
  })();

const setBrightnessPlatform = (brightness: number): Promise<number> =>
  Platform.select({
    ios: ScreenBrightness.setBrightness,
    default: ScreenBrightness.setAppBrightness
  })(brightness);

// if right return the current brightness
export const getBrightness = (): TaskEither<Error, number> =>
  tryCatch(getBrightnessPlatform, reason => new Error(String(reason)));

// if right return the set brightness
export const setBrightness = (brightness: number): TaskEither<Error, number> =>
  tryCatch(
    () => setBrightnessPlatform(brightness),
    reason => new Error(String(reason))
  );

const HIGH_BRIGHTNESS = 1.0; // Target screen brightness for a very bright screen

/**
 * Hook that sets the brightness to maximum, until the screen is unmounted
 */
export const useMaxBrightness = () => {
  // Brightness effect manager
  React.useEffect(() => {
    // eslint-disable-next-line functional/no-let
    let myBrightness: number | undefined;

    const myBrightF = async () => {
      myBrightness = await getBrightness()
        .fold(
          () => undefined,
          _ => _
        )
        .run();
    };

    const mySetBrightF = async () => {
      await myBrightF();
      if (myBrightness) {
        await setBrightness(HIGH_BRIGHTNESS).run();
      }
    };

    const finishedSet = mySetBrightF();

    return () => {
      const restoreDeviceBrightnessF = async () => {
        await finishedSet;
        if (myBrightness) {
          await setBrightness(myBrightness)
            .fold(
              () => undefined,
              _ => _
            )
            .run();
        }
      };
      void restoreDeviceBrightnessF();
    };
  }, []);
};
