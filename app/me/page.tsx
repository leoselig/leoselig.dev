import { Metadata } from "next";

import { Markdown } from "../../common/Markdown";
import { introData, personalData } from "../../common/pageData";
import { SkillsSection } from "../../common/sections/SkillsSection";
import ContactSection from "../../common/sections/ContactSection";

import styles from "./page.module.css";
// import { ExperienceSection } from "../common/sections/ExperienceSection";

export default function AboutMePage() {
  return (
    <div className={styles.root}>
      <Markdown data={introData.content} />
      {/* <SExperienceSection /> */}
      <SkillsSection className={styles["skills-section"]} />
      <Markdown data={personalData.content} />
      <ContactSection className={styles["contact-section"]} />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Leo Selig | Software Engineer",
  description: "Leo Selig, Freelancing Software Engineer, Berlin Area",
};
// const SExperienceSection = styled(ExperienceSection)`
//   margin-top: var(--section-gap);
// `;
