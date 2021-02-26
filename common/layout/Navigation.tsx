import { ReactNode, useCallback, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";

import {
  getRelativeMorphDividerPadding,
  MorphDivider,
  MORPH_DIVIDER_TRANSITION_DURATION,
} from "../MorphDivider";
import { responsive } from "../responsive";
import { SPACE_L, SPACE_M } from "../theme";

import { NavigationItem } from "./NavigationItem";
import { useNavigationItems } from "./navigationData";

export const MORPH_DIVIDER_WIDTH_PX = 28;
export const MORPH_DIVIDER_HEIGHT_PX = 28;
export const NAVIGATION_HEIGHT_CALC = `calc(2 * ${SPACE_L} + ${MORPH_DIVIDER_HEIGHT_PX}px)`;

const morphDividerPadding = getRelativeMorphDividerPadding(
  MORPH_DIVIDER_WIDTH_PX,
  MORPH_DIVIDER_HEIGHT_PX
);

const SMorphDivider = styled(MorphDivider)`
  --color: ${({ theme }) => theme.colors.dark};

  &:first-child {
    margin-left: calc(${-morphDividerPadding} * ${MORPH_DIVIDER_WIDTH_PX}px);
  }
`;

const ResponsiveNonSMobileMorphDivider = styled(MorphDivider)`
  ${responsive({
    phone: css`
      display: none;
    `,
    portrait: css`
      display: none;
    `,
  })}
`;

export function Navigation({ ...otherProps }) {
  const { route: activeRoute } = useRouter();
  const [hoverStates, setHoverStates] = useState<{ [route: string]: boolean }>(
    {}
  );
  const handleHoverFocusChange = useCallback((route, isHovered) => {
    setHoverStates((current) => ({ ...current, [route]: isHovered }));
  }, []);
  const navigationItems = useNavigationItems("header");
  const isAnyHovered = useMemo(
    () => Object.values(hoverStates).some((isHovered) => isHovered),
    [hoverStates]
  );

  return (
    <Container {...otherProps}>
      {navigationItems.reduce((result, currentItem, index) => {
        const previousItem = navigationItems[index - 1] ?? null;
        const { title } = currentItem;
        const previousItemLink = previousItem
          ? "route" in previousItem
            ? previousItem.route
            : previousItem.url
          : null;
        const itemLink =
          "route" in currentItem ? currentItem.route : currentItem.url;

        return [
          ...result,
          <>
            <ResponsiveNonSMobileMorphDivider
              width={MORPH_DIVIDER_WIDTH_PX}
              height={MORPH_DIVIDER_HEIGHT_PX}
              state={
                previousItemLink && hoverStates[previousItemLink]
                  ? "toLeft"
                  : hoverStates[itemLink]
                  ? "toRight"
                  : !isAnyHovered && previousItemLink === activeRoute
                  ? "toLeft"
                  : !isAnyHovered && itemLink === activeRoute
                  ? "toRight"
                  : "default"
              }
            />
            <NavigationItemWrapper>
              <SMobileMorphDivider
                state={
                  hoverStates[itemLink] ||
                  (!isAnyHovered && itemLink === activeRoute)
                    ? "toRight"
                    : "default"
                }
                width={MORPH_DIVIDER_WIDTH_PX}
                height={MORPH_DIVIDER_HEIGHT_PX}
              />
              <SNavigationItem
                key={itemLink}
                route={itemLink}
                title={title}
                onHoverFocusChange={handleHoverFocusChange}
                isCurrentRoute={itemLink === activeRoute}
              />
              <SMobileRightSideMorphDivider
                state={
                  hoverStates[itemLink] ||
                  (!isAnyHovered && itemLink === activeRoute)
                    ? "toLeft"
                    : "default"
                }
                width={MORPH_DIVIDER_WIDTH_PX}
                height={MORPH_DIVIDER_HEIGHT_PX}
              />
            </NavigationItemWrapper>
            {index === navigationItems.length - 1 && (
              <ResponsiveNonSMobileMorphDivider
                state={
                  hoverStates[itemLink] ||
                  (!isAnyHovered && itemLink === activeRoute)
                    ? "toLeft"
                    : "default"
                }
                width={MORPH_DIVIDER_WIDTH_PX}
                height={MORPH_DIVIDER_HEIGHT_PX}
              />
            )}
          </>,
        ];
      }, [] as ReactNode[])}
    </Container>
  );
}

const NavigationItemWrapper = styled.div`
  display: flex;
`;

const SNavigationItem = styled(NavigationItem)`
  margin: 0 ${SPACE_M};

  ${responsive({
    phone: css`
      margin: 0;
    `,
    portrait: css`
      margin: 0;
    `,
  })}
`;

const SMobileMorphDivider = styled(SMorphDivider)`
  display: none;
  ${responsive({
    phone: css`
      display: block;
    `,
    portrait: css`
      display: block;
    `,
  })}
`;

const SMobileRightSideMorphDivider = styled(SMobileMorphDivider)`
  opacity: 0;
  transition: opacity ease-in-out ${MORPH_DIVIDER_TRANSITION_DURATION}ms;

  ${({ state }) =>
    state === "toLeft" &&
    css`
      opacity: 1;
    `}
`;

const verticalContainerStyle = css`
  flex-wrap: wrap;

  > ${NavigationItemWrapper} {
    flex-basis: 100%;

    &:not(:first-child) {
      margin-left: 0;
      margin-bottom: ${SPACE_L};
    }
  }
`;

const Container = styled.nav`
  display: flex;
  align-items: center;

  ${responsive({
    phone: verticalContainerStyle,
    portrait: verticalContainerStyle,
  })}
`;
