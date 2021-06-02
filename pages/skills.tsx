import { Fragment } from "react";
import styled from "styled-components";

import { Headline2, Paragraph } from "../common/text";
import { skillsByKinds, skillsData, SKILL_KINDS } from "../common/pageData";

const Container = styled.div``;

export default function SkillsPage() {
  return (
    <Container>
      {SKILL_KINDS.map((kind) => (
        <Fragment key={kind}>
          <Headline2>{skillsData.labels[kind]}</Headline2>
          <Paragraph>
            {skillsByKinds[kind].map((skill, index) => (
              <Fragment key={skill.name}>
                {index === 0 || ", "}
                <span>{skill.name}</span>
              </Fragment>
            ))}
          </Paragraph>
        </Fragment>
      ))}
    </Container>
  );
}

SkillsPage.pageStructure = {
  id: "skills",
  title: "Skills",
};
