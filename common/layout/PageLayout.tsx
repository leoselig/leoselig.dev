import { ComponentType, ReactNode } from "react";
import styled, { css } from "styled-components";

import {
  getTrapezoidExtendedSideLengthRatio,
  trapezoidEnterAnimationStyles,
} from "../effects";
import { responsive } from "../responsive";
import { SPACE_L, SPACE_M, SPACE_XL } from "../theme";
import { TrapezoidSwitchTransition } from "../TrapezoidSwitchTransition";
import { getRelativeMorphDividerPadding } from "../MorphDivider";

import { Footer } from "./Footer";
import {
  Navigation,
  MORPH_DIVIDER_WIDTH_PX,
  MORPH_DIVIDER_HEIGHT_PX,
} from "./Navigation";
import { pageXPadding } from "./pageLayoutConfig";

export type TLayout = {};

const HERO_IMAGE_SIZE_REM = {
  phone: 8,
  portrait: 8,
  landscape: 10,
  large: 15,
};
const HERO_IMAGE_SIZE = {
  phone: `${HERO_IMAGE_SIZE_REM.phone}rem`,
  portrait: `${HERO_IMAGE_SIZE_REM.portrait}rem`,
  landscape: `${HERO_IMAGE_SIZE_REM.landscape}rem`,
  large: `${HERO_IMAGE_SIZE_REM.large}rem`,
};

const PAGE_TOP_PADDING = SPACE_XL;

const SNavigation = styled(Navigation)`
  grid-area: navigation;
  align-self: flex-start;
  overflow: hidden;

  ${responsive({
    phone: css`
      padding: ${PAGE_TOP_PADDING} calc(${pageXPadding.phone}) ${SPACE_M}
        ${SPACE_M};
    `,
    portrait: css`
      padding: ${PAGE_TOP_PADDING} calc(${pageXPadding.portrait}) ${SPACE_M}
        ${SPACE_M};
    `,
    landscape: css`
      padding: ${PAGE_TOP_PADDING} calc(${pageXPadding.landscape}) ${SPACE_L}
        calc(
          ${pageXPadding.landscape} +
            ${getTrapezoidExtendedSideLengthRatio(
              HERO_IMAGE_SIZE_REM.portrait
            )}rem -
            ${getRelativeMorphDividerPadding(
              MORPH_DIVIDER_WIDTH_PX,
              MORPH_DIVIDER_HEIGHT_PX
            ) * MORPH_DIVIDER_WIDTH_PX}px
        );
    `,
    large: css`
      padding: ${PAGE_TOP_PADDING} ${pageXPadding.large} 0 ${SPACE_L};
    `,
  })}
`;

const SRoot = styled.div`
  width: 100vw;
  min-height: 100%;

  display: grid;
  align-items: flex-end;
  background-color: ${({ theme }) => theme.colors.light};
  overflow: hidden;

  transition: grid-template-rows ease-in-out 200ms,
    grid-template-columns ease-in-out 200ms;

  ${responsive({
    phone: css`
      grid-template-areas:
        "hero-image navigation"
        "title title"
        "content content"
        "footer footer";
      grid-template-rows: max-content min-content auto auto;
      grid-template-columns: minmax(auto, 1fr) minmax(auto, 1fr);
    `,
    portrait: css`
      grid-template-areas:
        "hero-image navigation"
        "title title"
        "content content"
        "footer footer";
      grid-template-rows: max-content min-content auto auto;
      grid-template-columns: minmax(auto, 1fr) minmax(auto, 1fr);
    `,
    landscape: css`
      grid-template-areas:
        "navigation navigation"
        "hero-image title"
        "content content"
        "footer footer";
      grid-template-rows: max-content min-content auto auto;
      grid-template-columns: min-content 1fr;
    `,
    large: css`
      grid-template-areas:
        "hero-image navigation"
        "hero-image title"
        "content content"
        "footer footer";
      grid-template-rows: max-content min-content auto auto;
      grid-template-columns: min-content 1fr;
    `,
  })};
`;

const HeroImageContainer = styled.div`
  grid-area: hero-image;

  ${trapezoidEnterAnimationStyles()};

  ${responsive({
    phone: css`
      margin: ${PAGE_TOP_PADDING} 0 0 ${pageXPadding.phone};
      align-self: flex-start;
      min-width: ${HERO_IMAGE_SIZE.phone};
      min-height: ${HERO_IMAGE_SIZE.phone};
    `,
    portrait: css`
      margin: ${PAGE_TOP_PADDING} 0 0 ${pageXPadding.portrait};
      align-self: flex-start;
      min-width: ${HERO_IMAGE_SIZE.portrait};
      min-height: ${HERO_IMAGE_SIZE.portrait}; ;
    `,
    landscape: css`
      margin: 0 0 0 ${pageXPadding.landscape};
      width: ${HERO_IMAGE_SIZE.landscape};
      height: ${HERO_IMAGE_SIZE.landscape};
    `,
    large: css`
      margin: ${PAGE_TOP_PADDING} 0 0 ${pageXPadding.large};
      width: ${HERO_IMAGE_SIZE.large};
      height: ${HERO_IMAGE_SIZE.large};
    `,
  })}
`;

const TitleContainer = styled.div`
  grid-area: title;

  align-self: stretch;

  font-size: 5rem;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 1em;
  transform: translateY(0.13em);

  display: flex;
  align-items: flex-end;

  ${responsive({
    phone: css`
      align-self: center;
      font-size: 2.5rem;
      padding: ${SPACE_L} ${pageXPadding.phone} 0;
    `,
    portrait: css`
      align-self: center;
      font-size: 3.5rem;
      padding: ${SPACE_L} ${pageXPadding.portrait} 0;
    `,
    landscape: css`
      align-self: center;
    `,
  })}
`;

const ContentContainer = styled.main`
  grid-area: content;
  border-top: 3px solid ${({ theme }) => theme.colors.dark};
  margin-top: ${SPACE_L};
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
  Title: ComponentType<{}>;
  id: string;
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
      <SNavigation />
      <HeroImageContainer>{heroImage}</HeroImageContainer>
      <TitleContainer>
        <TrapezoidSwitchTransition elementKey={pageStructure.id}>
          <pageStructure.Title />
        </TrapezoidSwitchTransition>
      </TitleContainer>

      <ContentContainer>
        <TrapezoidSwitchTransition elementKey={pageStructure.id}>
          {content}
        </TrapezoidSwitchTransition>
      </ContentContainer>

      <SFooter />
    </SRoot>
  );
}

const SFooter = styled(Footer)`
  grid-area: footer;
`;
