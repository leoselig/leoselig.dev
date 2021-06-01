import { Fragment } from "react";
import styled from "styled-components";

import { Headline2, Paragraph } from "../common/text";
import {
  skillsData,
  SKILL_KINDS,
  TPageData$Skill,
  TPageData$Skill$Kind,
} from "../common/pageData";

const Container = styled.div``;

type TSkillsByKind = {
  [skillKind in TPageData$Skill$Kind]: TPageData$Skill[];
};

const skillsByKinds = skillsData.skills.reduce(
  (allResult, skill) =>
    skill.kinds.reduce(
      (kindResult, kind) => ({
        ...kindResult,
        [kind]: [...(kindResult[kind] ?? []), skill],
      }),
      allResult
    ),
  {} as TSkillsByKind
);

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
