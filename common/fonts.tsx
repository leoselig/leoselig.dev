import { css } from "styled-components";

import { responsive, ResponsiveMap } from "./responsive";

export type TFontWeight = "bold" | "regular";

export type TFontStyleConfig = {
  size: number;
  letterSpacing: number;
  weight: TFontWeight;
  lineHeight: number;
};

export const fontWeightMap: { [weightName in TFontWeight]: number } = {
  bold: 600,
  regular: 400,
};

export function createFontStyle({
  size,
  letterSpacing,
  weight,
  lineHeight,
}: TFontStyleConfig) {
  return css`
    letter-spacing: ${letterSpacing}em;
    font-size: ${size}px;
    font-weight: ${fontWeightMap[weight]};
    line-height: ${lineHeight}px;
  `;
}

export function createResponsiveFontStyles({
  phone,
  portrait,
  landscape,
  large,
}: ResponsiveMap<TFontStyleConfig>) {
  return responsive({
    phone: createFontStyle(phone),
    portrait: createFontStyle(portrait),
    landscape: createFontStyle(landscape),
    large: createFontStyle(large),
  });
}

export const FONT_STYLES_PAGE_LINK = createResponsiveFontStyles({
  phone: { size: 24, weight: "regular", letterSpacing: 0.01, lineHeight: 32 },
  portrait: {
    size: 24,
    weight: "regular",
    letterSpacing: 0.01,
    lineHeight: 32,
  },
  landscape: {
    size: 24,
    weight: "regular",
    letterSpacing: 0.01,
    lineHeight: 32,
  },
  large: { size: 24, weight: "regular", letterSpacing: -0.01, lineHeight: 32 },
});
