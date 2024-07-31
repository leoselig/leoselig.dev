import { ComponentType, HTMLProps, useMemo } from "react";

import { GitHubIcon, LinkedInIcon } from "../icons";

export type TNavigationItem$Base = {
  id: string;
  title: string;
  appearances: TNavigationItem$Appearance[];
  shouldOpenInNewWindow?: boolean;
  Icon?: ComponentType<HTMLProps<"svg">>;
};
export type TNavigationItem$Internal = TNavigationItem$Base & { route: string };
export type TNavigationItem$External = TNavigationItem$Base & { url: string };
export type TNavigationItem =
  | TNavigationItem$Internal
  | TNavigationItem$External;

export type TNavigationItem$Appearance = "header" | "footer";

export const NAVIGATION_ITEMS: {
  [id: string]:
    | Omit<TNavigationItem$Internal, "id">
    | Omit<TNavigationItem$External, "id">;
} = {
  aboutMe: { route: "/", title: "About Me", appearances: ["header"] },
  skills: { route: "/skills", title: "Skills", appearances: ["header"] },
  linkedIn: {
    url: "https://www.linkedin.com/in/leo-selig-38b10582/",
    title: "LinkedIn",
    Icon: LinkedInIcon,
    appearances: ["footer"],
  },
  github: {
    url: "https://github.com/leoselig/leoselig.dev",
    title: "GitHub",
    Icon: GitHubIcon,
    appearances: ["footer"],
  },
  cv: {
    route: "/cv",
    title: "CV",
    appearances: ["footer"],
    shouldOpenInNewWindow: true,
  },
  imprint: {
    route: "/imprint",
    title: "Imprint",
    appearances: ["footer"],
  },
  contact: {
    route: "/contact",
    title: "Reach out",
    appearances: ["header"],
  },
};

export const NAVIGATION_ITEMS_LIST: TNavigationItem[] = Object.entries(
  NAVIGATION_ITEMS,
).map(([id, value]) => ({
  id,
  ...value,
}));

export function useNavigationItems(
  appearance: TNavigationItem$Appearance,
): TNavigationItem[] {
  return useMemo(
    () =>
      NAVIGATION_ITEMS_LIST.filter(({ appearances }) =>
        appearances.includes(appearance),
      ),
    [appearance],
  );
}

export function getLinkFromNavigationItem(item: TNavigationItem): string {
  return "route" in item ? item.route : item.url;
}
