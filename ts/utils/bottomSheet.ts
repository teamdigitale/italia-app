import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalConfigs } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as React from "react";
import { Dimensions } from "react-native";
import { AccessibilityContent } from "../components/bottomSheet/AccessibilityContent";
import { BlurredBackgroundComponent } from "../components/bottomSheet/BlurredBackgroundComponent";
import { BottomSheetContent } from "../components/bottomSheet/BottomSheetContent";
import { BottomSheetHeader } from "../components/bottomSheet/BottomSheetHeader";
import { useHardwareBackButtonToDismiss } from "../features/bonus/bonusVacanze/components/hooks/useHardwareBackButton";
import { isScreenReaderEnabled } from "./accessibility";

export type BottomSheetProps = {
  content: React.ReactNode;
  config: BottomSheetModalConfigs;
};

/**
 * Utility function to build a BottomSheet considering accessibility. This will create a common BottomSheet object to be used in the `present` function
 * that is available only in component context since it uses the context api made available from https://gorhom.github.io/react-native-bottom-sheet/modal/methods
 * @param content
 * @param title
 * @param snapPoint
 * @param onClose
 */
export const bottomSheetContent = async (
  content: React.ReactNode,
  title: string | React.ReactNode,
  snapPoint: number,
  onClose: () => void
): Promise<BottomSheetProps> => {
  const isScreenReaderActive = await isScreenReaderEnabled();

  const header = BottomSheetHeader({ title, onClose });

  const bottomSheetBody: React.ReactNode = isScreenReaderActive
    ? AccessibilityContent(header, content)
    : BottomSheetContent({ children: content });

  return {
    content: bottomSheetBody,
    config: {
      snapPoints: [Math.min(snapPoint, Dimensions.get("window").height)],
      allowTouchThroughOverlay: false,
      dismissOnOverlayPress: true,
      dismissOnScrollDown: true,
      overlayComponent: () => BlurredBackgroundComponent(onClose),
      handleComponent: () => header
    }
  };
};

/**
 * Direct use of the bottomsheet in order to use a footer
 * @param content
 * @param title
 * @param snapPoint
 * @param onClose
 */
export const bottomSheetRawConfig = (
  content: React.ReactNode,
  title: string,
  snapPoint: number,
  onClose: () => void
): BottomSheetProps => ({
  content,
  config: {
    snapPoints: [snapPoint],
    allowTouchThroughOverlay: false,
    dismissOnOverlayPress: true,
    dismissOnScrollDown: true,
    overlayComponent: () => BlurredBackgroundComponent(onClose),
    handleComponent: () => BottomSheetHeader({ title, onClose })
  }
});

/**
 * Hook to generate a bottomSheet with a title, snapPoint and a component, in order to wrap the invocation of bottomSheetContent
 * @param component
 * @param title
 * @param snapPoint
 */
export const useIOBottomSheet = (
  component: React.ReactNode,
  title: string | React.ReactNode,
  snapPoint: number
) => {
  const { present, dismiss } = useBottomSheetModal();
  const setBSOpened = useHardwareBackButtonToDismiss(dismiss);
  const openModalBox = async () => {
    const bottomSheetProps = await bottomSheetContent(
      component,
      title,
      snapPoint,
      dismiss
    );
    present(bottomSheetProps.content, {
      ...bottomSheetProps.config
    });
    setBSOpened();
  };
  return { present: openModalBox, dismiss };
};

/**
 * Hook to generate a bottomSheet with a title, snapPoint and a component, in order to wrap the invocation of bottomSheetContent
 * Use this when the inner component has to handle the BS dismiss (ex a button that when pressed close the BS) and when
 * the BS title has to change on specific conditions
 * @param snapPoint
 * @param bsContent
 */
export const useIOBottomSheetRaw = (
  snapPoint: number,
  bsContent?: typeof bottomSheetContent
) => {
  const { present, dismiss } = useBottomSheetModal();
  const setBSOpened = useHardwareBackButtonToDismiss(dismiss);
  const openModalBox = async (component: React.ReactNode, title: string) => {
    const bottomSheetProps = bsContent
      ? await bsContent(component, title, snapPoint, dismiss)
      : bottomSheetRawConfig(component, title, snapPoint, dismiss);
    present(bottomSheetProps.content, {
      ...bottomSheetProps.config
    });
    setBSOpened();
  };
  return { present: openModalBox, dismiss };
};
