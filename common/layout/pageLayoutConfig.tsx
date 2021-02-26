import { maxWidthLeftPadding, ResponsiveMap } from "../responsive";
import { SPACE_M, SPACE_XL } from "../theme";

export const pageXPadding: ResponsiveMap<string> = {
  phone: maxWidthLeftPadding(SPACE_M),
  portrait: maxWidthLeftPadding(SPACE_XL),
  landscape: maxWidthLeftPadding(SPACE_XL),
  large: maxWidthLeftPadding(SPACE_XL),
};
