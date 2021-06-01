import yamlMeta from "../data/meta.yaml";
import yamlSkillsPage from "../data/skills.yaml";
import yamlAboutMePage from "../data/aboutMe.yaml";
import yamlContactPage from "../data/contact.yaml";
import yamlImprintPage from "../data/imprint.yaml";

// About me page data

export type TPageData$AboutMe = {
  content: string;
};

export const aboutMeData: TPageData$AboutMe = yamlAboutMePage;

export type TPageData$Contact = {
  content: string;
};

// Contact page data

export const contactData: TPageData$Contact = yamlContactPage;

export type TPageData$Imprint = {
  content: string;
};

// Imprint page data

export const imprintData: TPageData$Imprint = yamlImprintPage;

export type TPageData$Meta = {
  description: string;
};

// Sills page data

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

export type TPageData$Skills = {
  labels: { [key in TPageData$Skill$Kind]: string };
  skills: TPageData$Skill[];
};

export const skillsData: TPageData$Skills = yamlSkillsPage;

// Meta data

export const metaData: TPageData$Meta = yamlMeta;
