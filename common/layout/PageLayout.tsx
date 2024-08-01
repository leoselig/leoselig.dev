import { Fragment, ReactNode, useMemo } from "react";
import styled, { css } from "styled-components";

import { responsive } from "../responsive";
import { OpacitySwitchTransition } from "../OpacitySwitchTransition";
import { fontWeightMap } from "../fonts";

import { Footer } from "./Footer";
import { pageXPadding } from "./pageLayoutConfig";

export type TLayout = {};

const PAGE_TOP_PADDING = "var(--space-xl)";
const PAGE_TOP_PADDING_PHONE = pageXPadding.phone;

const SRoot = styled.div`
  width: 100%;
  min-height: 100%;

  display: grid;
  align-items: flex-end;
  background-color: var(--color-light);
  overflow: hidden;

  transition:
    grid-template-rows ease-in-out 200ms,
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
  border-radius: 0.5rem;
  overflow: hidden;
  aspect-ratio: 1 / 1;

  ${responsive({
    phone: css`
      width: 50%;
      margin: var(--space-l) 0;
    `,
  })}
`;

const STitleContainer = styled.div`
  grid-area: title;

  align-self: stretch;

  font-size: 4rem;
  font-weight: ${fontWeightMap.bold};
  text-transform: uppercase;
  line-height: 1em;

  display: flex;
  align-items: flex-end;
  text-indent: -0.05em;
`;

const ContentContainer = styled.main`
  grid-area: content;
  align-self: flex-start;

  ${responsive({
    phone: css`
      padding: var(--space-l) ${pageXPadding.phone};
    `,
    portrait: css`
      padding: var(--space-xl) ${pageXPadding.portrait};
    `,
    landscape: css`
      padding: var(--space-xl) ${pageXPadding.landscape};
    `,
    large: css`
      padding: var(--space-xl) ${pageXPadding.large};
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
  const yearsExperience = useMemo(() => new Date().getFullYear() - 2015, []);
  return (
    <SRoot {...otherProps}>
      <SHeader>
        <STitleContainer>Leo Selig</STitleContainer>
        <HeroImageContainer>{heroImage}</HeroImageContainer>
        <SSubline>
          {[
            "Freelancer",
            "Software Engineer",
            `${yearsExperience} years experience`,
            "Berlin area",
          ].map((text, index) => (
            <Fragment key={index}>
              {index !== 0 && <SSublineItemSplit />}
              <SSublineItem>{text}</SSublineItem>
            </Fragment>
          ))}
        </SSubline>
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

const SSubline = styled.div`
  grid-area: subline;
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  gap: var(--space-s);
`;

const SSublineItem = styled.div``;

const SSublineItemSplit = styled.div`
  width: 2px;
  background-color: var(--color-dark);
  align-self: stretch;
`;

const SHeader = styled.header`
  display: grid;

  grid-template-areas:
    "hero-image title"
    "hero-image subline";
  grid-template-columns: min-content 1fr;

  margin-bottom: var(--space-l);

  ${responsive({
    phone: css`
      padding: 0 ${pageXPadding.phone};
      grid-template-areas: "hero-image" "title" "subline";
      grid-template-columns: auto;
      column-gap: var(--space-m);
      justify-items: center;
      --title-to-subline-gap: var(--space-s);
      ${SSubline} {
        justify-content: center;
      }
    `,
    portrait: css`
      column-gap: var(--space-m);
      padding: 0 ${pageXPadding.portrait};
      --header-right-y-padding: var(--space-m);
      --title-to-subline-gap: var(--space-s);
    `,
    landscape: css`
      column-gap: var(--space-l);
      padding: 0 ${pageXPadding.landscape};
      --header-right-y-padding: var(--space-l);
      --title-to-subline-gap: var(--space-m);
    `,
    large: css`
      column-gap: var(--space-xl);
      padding: 0 ${pageXPadding.large};
      --header-right-y-padding: var(--space-xl);
      --title-to-subline-gap: var(--space-m);
    `,
  })};

  ${STitleContainer} {
    margin-top: var(--header-right-y-padding);
    margin-bottom: var(--title-to-subline-gap);
  }
  ${SSubline} {
    margin-bottom: var(--header-right-y-padding);
  }
`;
