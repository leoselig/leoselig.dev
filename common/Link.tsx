import NextLink from "next/link";
import { ReactNode, ComponentProps, HTMLProps } from "react";
import styled from "styled-components";

export const SAnchor = styled.a`
  cursor: pointer;
  transition: color ease-in-out 300ms;
  color: ${({ theme }) => theme.colors.interactive};
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.colors.active};
    transition: color ease-in-out 100ms;
  }
`;

type TProps = {
  to: string;
  children: ReactNode;
} & Pick<HTMLProps<typeof SAnchor>, "target"> &
  Pick<ComponentProps<typeof NextLink>, "passHref" | "prefetch">;

export function Link({
  to,
  children,
  passHref,
  target,
  prefetch,
  ...otherProps
}: TProps) {
  if (to.match(/^[a-zA-Z][a-zA-Z0-9\-\+\.]+:/)) {
    return (
      <SAnchor href={to} target="_blank" rel="noopener" {...otherProps}>
        {children}
      </SAnchor>
    );
  }
  const hasTarget = !!target;

  return (
    <NextLink
      href={to}
      passHref={passHref ?? hasTarget}
      prefetch={prefetch ?? !hasTarget}
    >
      <SAnchor target={target} {...otherProps}>
        {children}
      </SAnchor>
    </NextLink>
  );
}
