import { Fragment } from "react";
import styled from "styled-components";

import { Headline2, Paragraph } from "../common/text";
import { skillsByKinds, skillsData, SKILL_KINDS } from "../common/pageData";

const Container = styled.div``;

export default function SkillsPage() {
  return (
    <Container>
      <Paragraph>
        This is a non-exhaustive list of tech I have worked with in the past.
        I'm not playing Bingo here, so this really just includes stuff I gained
        a good level of knowledge in and feel confident working with.
      </Paragraph>

      {SKILL_KINDS.map((kind) => (
        <Fragment key={kind}>
          <Headline2>{skillsData.labels[kind]}</Headline2>
          <SSkillParagraph>
            {skillsByKinds[kind].map((skill, index) => (
              <Fragment key={skill.name}>
                <SSkill>
                  {skill.name}
                  {skillsByKinds[kind].length > index + 1 && ", "}
                </SSkill>
              </Fragment>
            ))}
          </SSkillParagraph>
        </Fragment>
      ))}
    </Container>
  );
}

SkillsPage.pageStructure = {
  id: "skills",
  title: "Skills",
};

const SSkillParagraph = styled(Paragraph)`
  line-height: 2em;
`;

const SSkill = styled.span`
  padding-right: 0.2em;
`;
