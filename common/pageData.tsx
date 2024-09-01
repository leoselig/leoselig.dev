import yamlMeta from "../data/meta.yaml";
import yamlSkills from "../data/skills.yaml";
import yamlPersonalData from "../data/personal.yaml";
import yamlIntroData from "../data/intro.yaml";
import yamlContactPage from "../data/contact.yaml";
import yamlImprintPage from "../data/imprint.yaml";
import yamlExperience from "../data/experience.yaml";
import yamlCV from "../data/cv.yaml";
import yamlCertifications from "../data/certifications.yaml";

import {
  TPageData$Personal,
  TPageData$Certifications,
  TPageData$Contact,
  TPageData$CV,
  TPageData$Experience,
  TPageData$Imprint,
  TPageData$Meta,
  TPageData$Skill,
  TPageData$Skill$Kind,
  TPageData$Skills,
  TPageData$Intro,
} from "./dataSchemas";

export const introData: TPageData$Intro = yamlIntroData;

export const personalData: TPageData$Personal = yamlPersonalData;

export const contactData: TPageData$Contact = yamlContactPage;

export const imprintData: TPageData$Imprint = yamlImprintPage;

export const skillsData: TPageData$Skills = yamlSkills;

export const SKILL_KINDS: TPageData$Skill$Kind[] = [
  "domain",
  "framework",
  "tools",
  "methodology",
];

type TSkillsByKind = {
  [skillKind in TPageData$Skill$Kind]: TPageData$Skill[];
};

export const skillsByKinds = skillsData.skills.reduce(
  (allResult, skill) =>
    skill.kinds.reduce(
      (kindResult, kind) => ({
        ...kindResult,
        [kind]: [...(kindResult[kind] ?? []), skill],
      }),
      allResult,
    ),
  {} as TSkillsByKind,
);

// Meta data

export type { TPageData$Meta };

export const metaData: TPageData$Meta = yamlMeta;

// Experience

export const experienceData: TPageData$Experience = yamlExperience;

// CV

export const cvData: TPageData$CV = yamlCV;

// Certifications

export const certificationsData: TPageData$Certifications = yamlCertifications;
