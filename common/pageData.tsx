import yamlMeta from "../data/meta.yaml";
import yamlSkills from "../data/skills.yaml";
import yamlAboutMePage from "../data/aboutMe.yaml";
import yamlContactPage from "../data/contact.yaml";
import yamlImprintPage from "../data/imprint.yaml";
import yamlExperience from "../data/experience.yaml";
import yamlCV from "../data/cv.yaml";
import yamlCertifications from "../data/certifications.yaml";

// About me page data

export type TPageData$AboutMe = {
  content: string;
};

export const aboutMeData: TPageData$AboutMe = yamlAboutMePage;

// Contact page data

export type TPageData$Contact = {
  labels: { phone: string; email: string; website: string; signal: string };
  phoneNumber: string;
  emailAddress: string;
  websiteURL: string;
  signalUsername: string;
};

export const contactData: TPageData$Contact = yamlContactPage;

// Imprint page data

export type TPageData$Imprint = {
  content: string;
};

export const imprintData: TPageData$Imprint = yamlImprintPage;

// Sills page data

export const SKILL_KINDS = [
  "domain",
  "framework",
  "tools",
  "methodology",
] as const;

type ElementType<T extends ReadonlyArray<unknown>> =
  T extends ReadonlyArray<infer ElementType> ? ElementType : never;

export type TPageData$Skill$Kind = ElementType<typeof SKILL_KINDS>;

export type TPageData$Skill = {
  name: string;
  kinds: TPageData$Skill$Kind[];
};

export type TPageData$Skills = {
  labels: { [key in TPageData$Skill$Kind]: string };
  skills: TPageData$Skill[];
};

export const skillsData: TPageData$Skills = yamlSkills;

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

export type TPageData$Meta = {
  description: string;
};

export const metaData: TPageData$Meta = yamlMeta;

// Experience

export const experienceData: TPageData$Experience = yamlExperience;

export type TPageData$Experience = {
  projects: TPageData$Experience$Project[];
  employments: TPageData$Experience$Employment[];
  education: TPageData$Experience$Education[];
  certifications: TPageData$Experience$Certification[];
};

export type TPageData$Experience$Project = {
  client: string;
  startDate: string;
  endDate: string;
  activities: string[];
  skills: string[];
};

export type TPageData$Experience$Employment = {
  position: string;
  employee: string;
  startDate: string;
  endDate: string;
  activities: string[];
  skills: string[];
};

export type TPageData$Experience$Education = {
  degree: string;
  authority: string;
  startDate: string;
  endDate: string;
};

export type TPageData$Experience$Certification = {
  title: string;
  authority: string;
};

// CV

export type TPageData$CV = {
  labels: {
    skills: string;
    certifications: string;
    projects: string;
    employments: string;
    education: string;
  };
  header: { name: string; title: string };
};

export const cvData: TPageData$CV = yamlCV;

// Certifications

export type TPageData$Certification = {
  name: string;
  authority: string;
};

export type TPageData$Certifications = {
  certifications: TPageData$Certification[];
};

export const certificationsData: TPageData$Certifications = yamlCertifications;
