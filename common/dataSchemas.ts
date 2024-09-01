import { z } from "zod";

export const projectPeriodSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  activities: z.array(z.string()),
  skills: z.array(z.string()),
});

export const projectSchema = z.object({
  client: z.string(),
  website: z.string().url().optional(),
  periods: z.array(projectPeriodSchema),
});

export const employmentSchema = z.object({
  position: z.string(),
  employee: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  activities: z.array(z.string()),
  skills: z.array(z.string()),
});

export const educationSchema = z.object({
  degree: z.string(),
  authority: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const experienceCertificationSchema = z.object({
  title: z.string(),
  authority: z.string(),
});

export const experienceDataSchema = z.object({
  projects: z.array(projectSchema),
  employments: z.array(employmentSchema),
  education: z.array(educationSchema),
});

// Intro  section data

export type TPageData$Intro = z.infer<typeof introDataSchema>;

export const introDataSchema = z.object({
  content: z.string(),
});

// Personal section data

export type TPageData$Personal = z.infer<typeof personalDataSchema>;

export const personalDataSchema = z.object({
  content: z.string(),
});

// Contact page data

export const contactDataSchema = z.object({
  labels: z.object({
    phone: z.string(),
    email: z.string(),
    website: z.string(),
    signal: z.string(),
  }),
  phoneNumber: z.string(),
  emailAddress: z.string(),
  websiteURL: z.string(),
  signalUsername: z.string(),
});

export type TPageData$Contact = z.infer<typeof contactDataSchema>;

// Imprint page data

export const imprintDataSchema = z.object({
  content: z.string(),
});

export type TPageData$Imprint = z.infer<typeof imprintDataSchema>;

// Sills page data

export const skillKindsSchema = z.union([
  z.literal("domain"),
  z.literal("framework"),
  z.literal("tools"),
  z.literal("methodology"),
]);

export type TPageData$Skill$Kind = z.infer<typeof skillKindsSchema>;

export type TPageData$Skill = z.infer<typeof skillEntrySchema>;

export const skillEntrySchema = z.object({
  name: z.string(),
  kinds: z.array(skillKindsSchema),
});

export const skillsDataSchema = z.object({
  labels: z.record(skillKindsSchema, z.string()),
  skills: z.array(skillEntrySchema),
});

export type TPageData$Skills = z.infer<typeof skillsDataSchema>;

// Meta data

export const metaSchema = z.object({
  description: z.string(),
});

export type TPageData$Meta = z.infer<typeof metaSchema>;

// Experience

export type TPageData$Experience = z.infer<typeof experienceDataSchema>;

export type TPageData$Experience$Project$Period = z.infer<
  typeof projectPeriodSchema
>;

export type TPageData$Experience$Project = z.infer<typeof projectSchema>;

export type TPageData$Experience$Employment = z.infer<typeof employmentSchema>;

export type TPageData$Experience$Education = z.infer<typeof educationSchema>;

export type TPageData$Experience$Certification = z.infer<
  typeof experienceCertificationSchema
>;

// CV

export const cvDataSchema = z.object({
  labels: z.object({
    skills: z.string(),
    certifications: z.string(),
    projects: z.string(),
    employments: z.string(),
    education: z.string(),
  }),
  header: z.object({ name: z.string(), title: z.string() }),
});

export type TPageData$CV = z.infer<typeof cvDataSchema>;

// Certifications

export const certificationsEntrySchema = z.object({
  name: z.string(),
  authority: z.string(),
});

export const certificationsDataSchema = z.object({
  entries: z.array(certificationsEntrySchema),
});

export type TPageData$Certification = z.infer<typeof certificationsEntrySchema>;

export type TPageData$Certifications = z.infer<typeof certificationsDataSchema>;
