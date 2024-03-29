import { ReactNode } from "react";
import styled, { css } from "styled-components";

import { responsive } from "../responsive";
import { SPACE_L, SPACE_M, SPACE_XL } from "../theme";
import { OpacitySwitchTransition } from "../OpacitySwitchTransition";
import { fontWeightMap } from "../fonts";

import { Footer } from "./Footer";
import { Navigation } from "./Navigation";
import { pageXPadding } from "./pageLayoutConfig";

export type TLayout = {};

const HERO_IMAGE_SIZE_REM = {
  phone: 8,
  portrait: 8,
  landscape: 15,
  large: 15,
};
const HERO_IMAGE_SIZE = {
  phone: `${HERO_IMAGE_SIZE_REM.phone}rem`,
  portrait: `${HERO_IMAGE_SIZE_REM.portrait}rem`,
  landscape: `${HERO_IMAGE_SIZE_REM.landscape}rem`,
  large: `${HERO_IMAGE_SIZE_REM.large}rem`,
};

const PAGE_TOP_PADDING = SPACE_XL;
const PAGE_TOP_PADDING_PHONE = pageXPadding.phone;

const SNavigation = styled(Navigation)`
  grid-area: navigation;
  align-self: flex-end;

  ${responsive({
    phone: css`
      align-self: flex-start;
      padding: 0 calc(${pageXPadding.portrait}) ${SPACE_M} ${SPACE_M};
    `,
    portrait: css`
      align-self: flex-start;
      padding: 0 calc(${pageXPadding.portrait}) ${SPACE_M} ${SPACE_M};
    `,
    landscape: css`
      padding: 0 ${pageXPadding.large} 0 0;
    `,
    large: css`
      padding: 0 ${pageXPadding.large} 0 0;
    `,
  })}
`;

const SRoot = styled.div`
  width: 100%;
  min-height: 100%;

  display: grid;
  align-items: flex-end;
  background-color: ${({ theme }) => theme.colors.light};
  overflow: hidden;

  transition: grid-template-rows ease-in-out 200ms,
    grid-template-columns ease-in-out 200ms;

  padding-top: ${PAGE_TOP_PADDING};
  grid-template-areas:
    "header"
    "content"
    "footer";
  grid-template-rows: min-content auto auto;

  ${responsive({
    phone: css`
      padding-top: ${PAGE_TOP_PADDING_PHONE};
    `,
  })}
`;

const HeroImageContainer = styled.div`
  grid-area: hero-image;

  ${responsive({
    phone: css`
      margin: 0 0 0 ${pageXPadding.phone};
      align-self: flex-start;
      min-width: ${HERO_IMAGE_SIZE.phone};
      min-height: ${HERO_IMAGE_SIZE.phone};
    `,
    portrait: css`
      margin: 0 ${SPACE_L} 0 ${pageXPadding.portrait};
      align-self: flex-start;
      min-width: ${HERO_IMAGE_SIZE.portrait};
      min-height: ${HERO_IMAGE_SIZE.portrait}; ;
    `,
    landscape: css`
      margin: 0 ${SPACE_L} 0 ${pageXPadding.landscape};
      width: ${HERO_IMAGE_SIZE.landscape};
      height: ${HERO_IMAGE_SIZE.landscape};
    `,
    large: css`
      margin: 0 ${SPACE_L} 0 ${pageXPadding.large};
      width: ${HERO_IMAGE_SIZE.large};
      height: ${HERO_IMAGE_SIZE.large};
    `,
  })}
`;

const TitleContainer = styled.div`
  grid-area: title;

  align-self: stretch;

  font-size: 5rem;
  font-weight: ${fontWeightMap.bold};
  text-transform: uppercase;
  line-height: 1em;

  display: flex;
  align-items: flex-end;

  ${responsive({
    phone: css`
      display: none;
    `,
    portrait: css`
      display: none;
    `,
    landscape: css`
      transform: translateY(-0.13em);
    `,
    large: css`
      transform: translateY(-0.13em);
    `,
  })}
`;

const ContentContainer = styled.main`
  grid-area: content;
  align-self: flex-start;

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

export type TPageStructure = {
  omitLayout?: boolean;
  title: string;
  id: string;
  renderHeadComponents?: () => ReactNode;
};

type TProps = {
  pageStructure: TPageStructure;
  content: ReactNode;
  heroImage: ReactNode;
};

export function PageLayout({
  pageStructure,
  content,
  heroImage,
  ...otherProps
}: TProps) {
  return (
    <SRoot {...otherProps}>
      <SHeader>
        <TitleContainer>Leo Selig</TitleContainer>
        <SNavigation />
        <HeroImageContainer>{heroImage}</HeroImageContainer>
      </SHeader>

      <ContentContainer>
        <OpacitySwitchTransition elementKey={pageStructure.id}>
          {content}
        </OpacitySwitchTransition>
      </ContentContainer>

      <SFooter />
    </SRoot>
  );
}

const SFooter = styled(Footer)`
  grid-area: footer;
`;

const SHeader = styled.header`
  display: grid;

  ${responsive({
    phone: css`
      grid-template-areas: "hero-image navigation";
      grid-template-columns: minmax(auto, 1fr) minmax(auto, 1fr);
    `,
    portrait: css`
      grid-template-areas: "hero-image navigation";
      grid-template-columns: minmax(auto, 2fr) minmax(auto, 3fr);
    `,
    landscape: css`
      grid-template-areas:
        "hero-image ."
        "hero-image title"
        "hero-image navigation";
      grid-template-rows: 1fr auto 1fr;
      grid-template-columns: min-content 1fr;
    `,
    large: css`
      grid-template-areas:
        "hero-image ."
        "hero-image title"
        "hero-image navigation";
      grid-template-rows: 1fr auto 1fr;
      grid-template-columns: min-content 1fr;
    `,
  })};
`;
