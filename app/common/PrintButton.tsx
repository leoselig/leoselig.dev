"use client";

import classNames from "classnames";
import { HTMLProps, useCallback } from "react";

import { linkStyles } from "../../common/Link";

import styles from "./PrintButton.module.css";

export const PrintButton = ({
  className,
  ...otherProps
}: Omit<HTMLProps<HTMLAnchorElement>, "onClick">) => {
  const handleClickPrint = useCallback(() => window.print(), []);

  return (
    <a
      onClick={handleClickPrint}
      className={classNames(
        linkStyles.backgroundEffectLink,
        styles.root,
        className,
      )}
      {...otherProps}
    >
      Print me!
    </a>
  );
};
