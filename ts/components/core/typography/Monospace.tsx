import * as React from "react";
import { IOFontFamily, IOFontWeight } from "../fonts";
import { IOColorType } from "../variables/IOColors";
import { ExternalTypographyProps, TypographyProps } from "./common";
import { typographyFactory } from "./Factory";

type AllowedColors = Extract<IOColorType, "bluegrey">;
type AllowedWeight = Extract<IOFontWeight, "Regular" | "SemiBold" | "Bold">;

type OwnProps = ExternalTypographyProps<
  TypographyProps<AllowedWeight, AllowedColors>
>;

const fontName: IOFontFamily = "RobotoMono";
const fontSize = 16;

/**
 * Typography component to render `Monospace` text with font size {@link fontSize} and fontFamily {@link fontName}.
 * default values(if not defined) are weight: `Regular`, color: `bluegrey`
 * @param props`
 * @constructor
 */
export const Monospace: React.FunctionComponent<OwnProps> = props =>
  typographyFactory<AllowedWeight, AllowedColors>({
    ...props,
    defaultWeight: "Regular",
    defaultColor: "bluegrey",
    font: fontName,
    fontStyle: { fontSize }
  });
