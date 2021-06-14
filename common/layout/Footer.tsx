import styled, { css } from "styled-components";

import { SIconSVG, createSVGStyles } from "../icons";
import { Link } from "../Link";
import { responsive } from "../responsive";
import { SPACE_L, SPACE_XL } from "../theme";

import {
  getLinkFromNavigationItem,
  useNavigationItems,
} from "./navigationData";
import { pageXPadding } from "./pageLayoutConfig";

export function Footer({ ...otherProps }) {
  const navigationItems = useNavigationItems("footer");

  return (
    <SRoot {...otherProps}>
      <SCopyRightText>© {new Date().getFullYear()}</SCopyRightText>
      <SLinks>
        {navigationItems.map((navigationItem) => (
          <SLink
            key={navigationItem.id}
            to={getLinkFromNavigationItem(navigationItem)}
            target={navigationItem.shouldOpenInNewWindow ? "_blank" : ""}
            enableBackgroundEffect={!navigationItem.Icon}
          >
            {navigationItem.Icon ? (
              <navigationItem.Icon title={navigationItem.title} />
            ) : (
              navigationItem.title
            )}
          </SLink>
        ))}
      </SLinks>
    </SRoot>
  );
}

const SRoot = styled.div`
  display: flex;
  border-top: 3px solid ${({ theme }) => theme.colors.dark};

  ${responsive({
    phone: css`
      padding: ${SPACE_L} ${pageXPadding.phone};
    `,
    portrait: css`
      padding: ${SPACE_XL} ${pageXPadding.portrait};
    `,
    landscape: css`
      padding: ${SPACE_XL} ${pageXPadding.landscape};
    `,
    large: css`
      padding: ${SPACE_XL} ${pageXPadding.large};
    `,
  })}
`;

const SCopyRightText = styled.span`
  margin-right: auto;
`;

const SLinks = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: ${SPACE_L};
  align-items: stretch;

  ${SIconSVG} {
    width: 3rem;
    height: 3rem;
    padding: 0.75rem;
    margin: -0.75rem;

    ${({ theme }) => createSVGStyles(theme.colors.interactive, "transparent")};

    &:hover {
      * {
        transition-duration: 123ms;
      }

      ${({ theme }) => createSVGStyles(theme.colors.active, "transparent")};
    }
  }
`;

const SLink = styled(Link)`
  display: flex;
  align-items: center;
`;
