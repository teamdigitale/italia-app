import * as React from "react";
import { View } from "react-native";
import { ComponentProps } from "../../types/react";
import { FAQsCategoriesType } from "../../utils/faq";
import { IOColorType } from "../core/variables/IOColors";
import { AccessibilityEvents } from "./BaseHeader";
import BaseScreenComponent from "./BaseScreenComponent";

interface OwnProps {
  accessibilityLabel?: string;
  onAccessibilityNavigationHeaderFocus?: () => void;
  headerTitle?: string;
  customRightIcon?: {
    iconName: string;
    onPress: () => void;
  };
  faqCategories?: ReadonlyArray<FAQsCategoriesType>;
  accessibilityEvents?: AccessibilityEvents;
  titleColor?: IOColorType;
  statusAppRef?: React.RefObject<View>;
}

type BaseScreenComponentProps =
  | "dark"
  | "appLogo"
  | "goBack"
  | "contextualHelp"
  | "contextualHelpMarkdown"
  | "headerBody"
  | "customGoBack"
  | "isSearchAvailable";

type Props = OwnProps &
  Pick<ComponentProps<typeof BaseScreenComponent>, BaseScreenComponentProps>;

export type TopScreenComponentProps = Props;

/**
 * Wraps a BaseScreenComponent with a title and a subtitle
 */
class TopScreenComponent extends React.PureComponent<Props> {
  public render() {
    const {
      dark,
      appLogo,
      goBack,
      headerTitle,
      accessibilityLabel,
      contextualHelp,
      contextualHelpMarkdown,
      headerBody,
      isSearchAvailable,
      customRightIcon,
      customGoBack,
      onAccessibilityNavigationHeaderFocus,
      faqCategories,
      accessibilityEvents,
      titleColor,
      statusAppRef
    } = this.props;

    return (
      <BaseScreenComponent
        onAccessibilityNavigationHeaderFocus={
          onAccessibilityNavigationHeaderFocus
        }
        accessibilityLabel={accessibilityLabel}
        appLogo={appLogo}
        dark={dark}
        goBack={goBack}
        headerTitle={goBack ? headerTitle : undefined}
        contextualHelp={contextualHelp}
        contextualHelpMarkdown={contextualHelpMarkdown}
        faqCategories={faqCategories}
        headerBody={headerBody}
        isSearchAvailable={isSearchAvailable}
        customRightIcon={customRightIcon}
        customGoBack={customGoBack}
        accessibilityEvents={accessibilityEvents}
        titleColor={titleColor}
        statusAppRef={statusAppRef}
      >
        {this.props.children}
      </BaseScreenComponent>
    );
  }
}

export default TopScreenComponent;
