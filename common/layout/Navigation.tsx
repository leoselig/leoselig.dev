import { ReactNode } from "react";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";

import { responsive } from "../responsive";
import { SPACE_L, SPACE_M } from "../theme";

import { NavigationItem } from "./NavigationItem";
import { useNavigationItems } from "./navigationData";

export const MORPH_DIVIDER_WIDTH_PX = 28;
export const MORPH_DIVIDER_HEIGHT_PX = 28;
export const NAVIGATION_HEIGHT_CALC = `calc(2 * ${SPACE_L} + ${MORPH_DIVIDER_HEIGHT_PX}px)`;

export function Navigation({ ...otherProps }) {
  const navigationItems = useNavigationItems("header");
  const { route: activeRoute } = useRouter();

  return (
    <Container {...otherProps}>
      {navigationItems.reduce((result, currentItem) => {
        const { title } = currentItem;

        const itemLink =
          "route" in currentItem ? currentItem.route : currentItem.url;

        return [
          ...result,
          <NavigationItemWrapper key={currentItem.id}>
            <SNavigationItem
              key={itemLink}
              route={itemLink}
              title={title}
              isCurrentRoute={itemLink === activeRoute}
            />
          </NavigationItemWrapper>,
        ];
      }, [] as ReactNode[])}
    </Container>
  );
}

const NavigationItemWrapper = styled.div`
  display: flex;
`;

const SNavigationItem = styled(NavigationItem)`
  margin: 0 ${SPACE_L};

  ${responsive({
    phone: css`
      margin: 0;
    `,
    portrait: css`
      margin: 0;
    `,
    landscape: css`
      &:first-child {
        margin-left: 0;
      }
    `,
    large: css`
      &:first-child {
        margin-left: 0;
      }
    `,
  })}
`;

const verticalContainerStyle = css`
  flex-wrap: wrap;

  > ${NavigationItemWrapper} {
    flex-basis: 100%;

    &:not(:last-child) {
      margin-bottom: ${SPACE_M};
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
