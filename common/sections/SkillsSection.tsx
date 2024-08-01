import { ComponentProps, Fragment } from "react";
import styled, { css } from "styled-components";

import { Headline2, Headline3, Paragraph } from "../text";
import { skillsByKinds, skillsData, SKILL_KINDS } from "../pageData";
import { responsive } from "../responsive";

type Props = ComponentProps<typeof SRoot>;

export const SkillsSection = ({ ...otherProps }: Props) => {
  return (
    <SRoot {...otherProps}>
      <Headline2>Skills</Headline2>
      <Paragraph>
        {
          "This is a non-exhaustive list of tech I have worked with in the past. I'm not playing Bingo here, so this really just includes stuff I gained a good level of knowledge in and feel confident working with."
        }
      </Paragraph>

      <SSkillGrid>
        {SKILL_KINDS.map((kind) => (
          <SSkillBox key={kind}>
            <SSkillBoxHeadline $enableBackgroundEffect={false}>
              {skillsData.labels[kind]}
            </SSkillBoxHeadline>
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
          </SSkillBox>
        ))}
      </SSkillGrid>
    </SRoot>
  );
};

const SRoot = styled.div``;

const SSkillParagraph = styled(Paragraph)`
  line-height: 2em;
`;

const SSkill = styled.span`
  padding-right: 0.2em;
`;

const SSkillBox = styled.div`
  border: 4px solid var(--color-dark);
  border-radius: 0.5rem;
  padding: 1rem;
`;

const SSkillGrid = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 1rem;
  margin-top: 1rem;

  ${responsive({
    phone: css``,
    portrait: css`
      grid-template-columns: 1fr 1fr;
      gap: var(--space-m);
    `,
    landscape: css`
      grid-template-columns: 1fr 1fr;
      gap: var(--space-l);
    `,
    large: css`
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: var(--space-l);
    `,
  })}
`;

const SSkillBoxHeadline = styled(Headline3)``;
