import { readFile } from "fs/promises";

import { z } from "zod";
import { parse } from "yaml";

import {
  aboutMeDataSchema,
  certificationsDataSchema,
  contactDataSchema,
  cvDataSchema,
  experienceDataSchema,
  imprintDataSchema,
  metaSchema,
  skillsDataSchema,
} from "../common/dataSchemas";

const readYamlFile = async (path: string) =>
  parse((await readFile(path)).toString());

(async () => {
  const result = z
    .object({
      aboutMeData: aboutMeDataSchema,
      cvData: cvDataSchema,
      metaData: metaSchema,
      skillsData: skillsDataSchema,
      contactData: contactDataSchema,
      certificationsData: certificationsDataSchema,
      imprintData: imprintDataSchema,
      experienceData: experienceDataSchema,
    })
    .safeParse({
      metaData: await readYamlFile("./data/meta.yaml"),
      skillsData: await readYamlFile("./data/skills.yaml"),
      aboutMeData: await readYamlFile("./data/aboutMe.yaml"),
      contactData: await readYamlFile("./data/contact.yaml"),
      imprintData: await readYamlFile("./data/imprint.yaml"),
      experienceData: await readYamlFile("./data/experience.yaml"),
      cvData: await readYamlFile("./data/cv.yaml"),
      certificationsData: await readYamlFile("./data/certifications.yaml"),
    });

  if (result.error) {
    console.error(result.error);
    process.exitCode = 1;
  }
})();
