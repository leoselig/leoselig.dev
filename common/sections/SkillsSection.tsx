import { Fragment, HTMLProps } from "react";

import { Headline2, Headline3, Paragraph } from "../text";
import { skillsByKinds, skillsData, SKILL_KINDS } from "../pageData";

import styles from "./SkillsSection.module.css";

type Props = HTMLProps<HTMLDivElement>;

export const SkillsSection = ({ ...otherProps }: Props) => {
  return (
    <div {...otherProps}>
      <Headline2>Skills</Headline2>
      <Paragraph>
        {
          "This is a non-exhaustive list of tech I have worked with in the past. I'm not playing Bingo here, so this really just includes stuff I gained a good level of knowledge in and feel confident working with."
        }
      </Paragraph>

      <div className={styles["skill-grid"]}>
        {SKILL_KINDS.map((kind) => (
          <div key={kind} className={styles["skill-box"]}>
            <Headline3>{skillsData.labels[kind]}</Headline3>
            <Paragraph className={styles["skill-paragraph"]}>
              {skillsByKinds[kind].map((skill, index) => (
                <Fragment key={skill.name}>
                  <span className={styles.skill}>
                    {skill.name}
                    {skillsByKinds[kind].length > index + 1 && ", "}
                  </span>
                </Fragment>
              ))}
            </Paragraph>
          </div>
        ))}
      </div>
    </div>
  );
};
