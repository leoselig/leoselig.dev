import NextLink from "next/link";
import { ReactNode, ComponentProps, HTMLProps } from "react";
import styled, { css } from "styled-components";

import { useHoverState } from "./useHoverState";

export const BACKGROUND_BLEED_SIZE_EM = 0.2;

const activeStyles = css`
  color: ${({ theme }) => theme.colors.light};
  transition-duration: 300ms, 300ms;

  &:after {
    transform: scaleX(1);
    transition-duration: 300ms, 300ms;
  }
`;

export const SAnchor = styled.a<{
  showActive?: boolean;
  enableBackgroundEffect?: boolean;
  makeBackgroundPaddingBleed?: boolean;
}>`
  cursor: pointer;
  transition: color ease-in-out 300ms, background-color ease-in-out 300ms;
  color: ${({ theme }) => theme.colors.interactive};
  text-decoration: underline;
  position: relative;
  z-index: 0;

  &:after {
    content: " ";
    display: ${({ enableBackgroundEffect = true }) =>
      enableBackgroundEffect ? "block" : "none"};

    position: absolute;
    z-index: -1;
    background-color: ${({ theme }) => theme.colors.dark};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform ease-in-out 300ms, background-color ease-in-out 300ms;
  }

  ${({ makeBackgroundPaddingBleed = true }) =>
    makeBackgroundPaddingBleed
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

  ${({ showActive = false }) => showActive && activeStyles}

  &:hover {
    ${activeStyles};
  }

  &:active {
    &:after {
      background-color: ${({ theme }) => theme.colors.active};
    }
  }
`;

type TProps = {
  to: string;
  children: ReactNode;
  showActive?: boolean;
  enableBackgroundEffect?: boolean;
  makeBackgroundPaddingBleed?: boolean;
} & Pick<HTMLProps<typeof SAnchor>, "target"> &
  Pick<ComponentProps<typeof NextLink>, "passHref">;

export function Link({
  to,
  children,
  passHref = true,
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
        showActive={showActive || isHovered}
        enableBackgroundEffect={enableBackgroundEffect}
        makeBackgroundPaddingBleed={makeBackgroundPaddingBleed}
        {...hoverProps}
        {...otherProps}
      >
        {children}
      </SAnchor>
    );
  }

  return (
    <NextLink href={to} passHref={passHref}>
      <SAnchor
        target={target}
        showActive={showActive || isHovered}
        enableBackgroundEffect={enableBackgroundEffect}
        makeBackgroundPaddingBleed={makeBackgroundPaddingBleed}
        {...hoverProps}
        {...otherProps}
      >
        {children}
      </SAnchor>
    </NextLink>
  );
}
