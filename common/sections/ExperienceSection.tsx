import { HTMLProps } from "react";

type Props = HTMLProps<HTMLDivElement>;

export const ExperienceSection = ({ ...otherProps }: Props) => {
  return <div {...otherProps} />;
};
