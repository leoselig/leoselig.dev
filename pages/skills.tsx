import { Fragment } from "react";
import styled from "styled-components";

import { Headline2, Paragraph } from "../common/text";
import {
  getPageData,
  SKILL_KINDS,
  TPageData$Skill,
  TPageData$Skill$Kind,
} from "../common/pageData";

const Container = styled.div``;

type TSkillsByKind = {
  [skillKind in TPageData$Skill$Kind]: TPageData$Skill[];
};
const skillsPageData = getPageData().skillsPage;
const skillsByKinds = skillsPageData.skills.reduce(
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
          <Headline2>{skillsPageData.labels[kind]}</Headline2>
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
  type: "SUB_PAGE",
  Title: function SkillsPageTitle() {
    return <div>Skills</div>;
  },
};
