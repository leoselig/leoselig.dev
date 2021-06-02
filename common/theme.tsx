import { DefaultTheme } from "styled-components";

const baseTheme = {
  colors: {
    light: "#fdfeff",
    dark: "#002641",
    interactive: "#005a96",
    active: "#00c2e4",
    meta: "#859eaf",
  },
};

export const defaultTheme: DefaultTheme = {
  colors: baseTheme.colors,
};

export const SPACE_S_REM = 0.5;
export const SPACE_S = `${SPACE_S_REM}rem`;
export const SPACE_M_REM = SPACE_S_REM * 2;
export const SPACE_M = `${SPACE_M_REM}rem`;
export const SPACE_L_REM = SPACE_M_REM * 2;
export const SPACE_L = `${SPACE_L_REM}rem`;
export const SPACE_XL_REM = SPACE_L_REM * 2;
export const SPACE_XL = `${SPACE_XL_REM}rem`;
