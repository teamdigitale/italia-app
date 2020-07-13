import { fromNullable } from "fp-ts/lib/Option";
import { Millisecond } from "italia-ts-commons/lib/units";
import { View } from "native-base";
import * as React from "react";
import {
  AccessibilityInfo,
  findNodeHandle,
  Platform,
  UIManager
} from "react-native";

/**
 * set the accessibility focus on the given nodeReference
 * use executionDelay to set focus with a delay (to use within componentDidMount)
 * @param nodeReference
 * @param executionDelay
 */
export const setAccessibilityFocus = <T extends View>(
  nodeReference: React.RefObject<T>,
  executionDelay: Millisecond = 0 as Millisecond // default: execute immediately
) => {
  setTimeout(() => {
    fromNullable(nodeReference && nodeReference.current) // nodeReference could be null or undefined
      .chain(ref => fromNullable(findNodeHandle(ref)))
      .map(reactTag => {
        if (Platform.OS === "android") {
          // could raise an exception
          try {
            UIManager.sendAccessibilityEvent(
              reactTag,
              UIManager.AccessibilityEventTypes.typeViewFocused
            );
            // tslint:disable-next-line:no-empty
          } catch {} // ignore
          return;
        }
        // ios
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      });
  }, executionDelay);
};


export const isScreenReaderEnabled = async (): Promise<boolean> => {
  const maybeReaderEnabled = await tryCatch(
    () => AccessibilityInfo.isScreenReaderEnabled(),
    errorMsg => new Error(String(errorMsg))
  ).run();
  return maybeReaderEnabled.getOrElse(false);
};
