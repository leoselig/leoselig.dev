import classNames from "classnames";
import { createElement, HTMLProps } from "react";

import styles from "./text.module.css";

type HeadlineProps = { enableBackgroundEffect?: boolean };

const createHeadlineComponent =
  (type: `h${1 | 2 | 3 | 4}`) =>
  ({
    className,
    children,
    enableBackgroundEffect = false,
    ...otherProps
  }: HTMLProps<HTMLHeadingElement> & HeadlineProps) =>
    createElement(
      type,
      {
        className: classNames(
          styles["text-base"],
          styles["headline-base"],
          styles[type],
          className,
          enableBackgroundEffect && styles["background-effect"],
        ),
        ...otherProps,
      },
      children,
    );

export const Headline1 = createHeadlineComponent("h1");

export const Headline2 = createHeadlineComponent("h2");

export const Headline3 = createHeadlineComponent("h3");

export const Paragraph = ({
  className,
  ...otherProps
}: HTMLProps<HTMLParagraphElement>) => (
  <p
    className={classNames(styles["text-base"], styles.paragraph, className)}
    {...otherProps}
  />
);

export const textStyles = { base: styles["text-base"] };
