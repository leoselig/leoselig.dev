import "styled-components";

declare module "styled-components" {
  interface DefaultTheme {
    colors: {
      light: string;
      dark: string;
      interactive: string;
      active: string;
      meta: string;
    };
  }
}
