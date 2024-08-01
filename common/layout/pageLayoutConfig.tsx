import { maxWidthLeftPadding, ResponsiveMap } from "../responsive";

export const pageXPadding: ResponsiveMap<string, string, string, string> = {
  phone: maxWidthLeftPadding("var(--space-m)"),
  portrait: maxWidthLeftPadding("var(--space-xl"),
  landscape: maxWidthLeftPadding("var(--space-xl"),
  large: maxWidthLeftPadding("var(--space-xl"),
};
