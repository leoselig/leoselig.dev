import pageData from "../data/pageData.yaml";

export function getPageData(): TPageData {
  return pageData;
}

export type TPageData = {
  meta: { description: string };
  skillsPage: {
    labels: { [key in TPageData$Skill$Kind]: string };
    skills: TPageData$Skill[];
  };
  aboutMe: string;
  imprint: { content: string };
  contact: { content: string };
};

export const SKILL_KINDS = [
  "domain",
  "framework",
  "platform",
  "tool",
  "methodology",
] as const;

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never;

export type TPageData$Skill$Kind = ElementType<typeof SKILL_KINDS>;

export type TPageData$Skill = {
  name: string;
  kinds: TPageData$Skill$Kind[];
};
