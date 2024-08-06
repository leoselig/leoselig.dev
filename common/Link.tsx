import NextLink from "next/link";
import { HTMLProps, ComponentProps } from "react";
import classNames from "classnames";

import styles from "./Link.module.css";

export const BACKGROUND_BLEED_SIZE_EM = 0.2;

export type LinkCssPropsType = {
  $showActive?: boolean;
  $enableBackgroundEffect?: boolean;
  $makeBackgroundPaddingBleed?: boolean;
};

type TProps = {
  to: string;
  showActive?: boolean;
  enableBackgroundEffect?: boolean;
  makeBackgroundPaddingBleed?: boolean;
} & Pick<HTMLProps<HTMLAnchorElement>, "target"> &
  Omit<ComponentProps<typeof NextLink>, "to" | "href" | "as" | "ref">;

export function Link({
  to,
  children,
  target,
  showActive = false,
  enableBackgroundEffect = true,
  makeBackgroundPaddingBleed = true,
  className: customClassName,
  ...otherProps
}: TProps) {
  const className = classNames(
    customClassName,
    styles.link,
    enableBackgroundEffect && styles["enable-background-effect"],
    makeBackgroundPaddingBleed && styles["bleed-background"],
    showActive && styles.active,
  );
  if (to.match(/^[a-zA-Z][a-zA-Z0-9\-\+\.]+:/)) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noreferrer"
        className={className}
        {...otherProps}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink
      className={className}
      href={to}
      target={target}
      data-show-active={showActive}
      {...otherProps}
    >
      {children}
    </NextLink>
  );
}

export const linkStyles = {
  link: styles.link,
};
