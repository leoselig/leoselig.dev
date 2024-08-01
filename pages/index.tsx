import styled from "styled-components";

import {
  Markdown,
  SMdHeadline1,
  SMdHeadline2,
  SMdHeadline3,
  SMdParagraph,
} from "../common/Markdown";
import { aboutMeData } from "../common/pageData";
import { SkillsSection } from "../common/sections/SkillsSection";
import ContactSection from "../common/sections/ContactSection";
// import { ExperienceSection } from "../common/sections/ExperienceSection";

export default function AboutMePage() {
  return (
    <SContainer>
      <Markdown data={aboutMeData.content} />
      {/* <SExperienceSection /> */}
      <SSkillsSection />
      <SContactSection />
    </SContainer>
  );
}

AboutMePage.pageStructure = {
  id: "aboutMe",
  title: "About Me",
};

const SContainer = styled.div`
  --section-gap: var(--space-xl);
  ${SMdParagraph} + ${SMdHeadline1},
    ${SMdParagraph} + ${SMdHeadline2},
    ${SMdParagraph} + ${SMdHeadline3} {
    margin-top: var(--section-gap);
  }
`;

const SSkillsSection = styled(SkillsSection)`
  margin-top: var(--section-gap);
`;

// const SExperienceSection = styled(ExperienceSection)`
//   margin-top: var(--section-gap);
// `;

const SContactSection = styled(ContactSection)`
  margin-top: var(--section-gap);
`;
