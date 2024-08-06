import { HTMLProps, ReactNode } from "react";
import classNames from "classnames";

import { Headline2 } from "./text";
import styles from "./Box.module.css";

type Props = HTMLProps<HTMLDivElement> & { title: ReactNode };

export const Box = ({ title, children, className, ...otherProps }: Props) => {
  return (
    <div className={classNames(styles.box, className)} {...otherProps}>
      <Headline2>{title}</Headline2>
      <div className={styles["box-children"]}>{children}</div>
    </div>
  );
};

export const BoxGrid = ({
  title,
  children,
  className,
  ...otherProps
}: Props) => {
  return (
    <div className={classNames(styles["grid"], className)} {...otherProps}>
      children
    </div>
  );
};
