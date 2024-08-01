import NextLink from "next/link";
import { ReactNode, HTMLProps } from "react";
import styled, { css } from "styled-components";

import { useHoverState } from "./useHoverState";

export const BACKGROUND_BLEED_SIZE_EM = 0.2;

const activeStyles = css`
  color: var(--color-light);
  transition-duration: 300ms, 300ms;

  &:after {
    transform: scaleX(1);
    transition-duration: 300ms, 300ms;
  }
`;

export type LinkCssPropsType = {
  $showActive?: boolean;
  $enableBackgroundEffect?: boolean;
  $makeBackgroundPaddingBleed?: boolean;
};

export const linkCss = css<LinkCssPropsType>`
  cursor: pointer;
  transition:
    color ease-in-out 300ms,
    background-color ease-in-out 300ms;
  color: var(--color-interactive);
  text-decoration: underline;
  position: relative;
  z-index: 0;

  &:after {
    content: " ";
    display: ${({ $enableBackgroundEffect = true }) =>
      $enableBackgroundEffect ? "block" : "none"};

    position: absolute;
    z-index: -1;
    background-color: var(--color-dark);
    border-radius: 0.2rem;
    transform: scaleX(0);
    transform-origin: left;
    transition:
      transform ease-in-out 300ms,
      background-color ease-in-out 300ms;
  }

  ${({ $makeBackgroundPaddingBleed = true }) =>
    $makeBackgroundPaddingBleed
      ? css`
          &:after {
            top: -${BACKGROUND_BLEED_SIZE_EM}em;
            bottom: -${BACKGROUND_BLEED_SIZE_EM}em;
            left: -${BACKGROUND_BLEED_SIZE_EM}em;
            right: -${BACKGROUND_BLEED_SIZE_EM}em;
          }
        `
      : css`
          padding: ${BACKGROUND_BLEED_SIZE_EM}em;
          &:after {
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
          }
        `};

  ${({ $showActive = false }) => $showActive && activeStyles}

  &:hover {
    ${activeStyles};
  }

  &:active {
    &:after {
      background-color: var(--color-active);
    }
  }
`;

export const SAnchor = styled.a<LinkCssPropsType>`
  ${linkCss}
`;

type TProps = {
  to: string;
  children: ReactNode;
  showActive?: boolean;
  enableBackgroundEffect?: boolean;
  makeBackgroundPaddingBleed?: boolean;
} & Pick<HTMLProps<HTMLAnchorElement>, "target">;

export function Link({
  to,
  children,
  target,
  showActive = false,
  enableBackgroundEffect = true,
  makeBackgroundPaddingBleed = true,
  ...otherProps
}: TProps) {
  const { isHovered, ...hoverProps } = useHoverState();

  if (to.match(/^[a-zA-Z][a-zA-Z0-9\-\+\.]+:/)) {
    return (
      <SAnchor
        href={to}
        target="_blank"
        rel="noopener"
        $showActive={showActive || isHovered}
        $enableBackgroundEffect={enableBackgroundEffect}
        $makeBackgroundPaddingBleed={makeBackgroundPaddingBleed}
        {...hoverProps}
        {...otherProps}
      >
        {children}
      </SAnchor>
    );
  }

  return (
    <SNextLink
      href={to}
      target={target}
      $showActive={showActive || isHovered}
      $enableBackgroundEffect={enableBackgroundEffect}
      $makeBackgroundPaddingBleed={makeBackgroundPaddingBleed}
      {...hoverProps}
      {...otherProps}
    >
      {children}
    </SNextLink>
  );
}

const SNextLink = styled(NextLink)<LinkCssPropsType>`
  ${linkCss}
`;
