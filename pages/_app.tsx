import Head from "next/head";
import { ComponentType, createElement } from "react";
import styled, {
  createGlobalStyle,
  css,
  ThemeProvider,
} from "styled-components";

import faviconsHTMLData from "../public/favicons/html-head-data.json";
import { PageLayout, ProfilePhoto, TPageStructure } from "../common/layout";
import { defaultTheme } from "../common/theme";
import { metaData } from "../common/pageData";

const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: "Fira Code", 'Courier New', Courier, monospace;
    font-size: 1em;
    color: ${({ theme }) => theme.colors.dark}
  }

  html,
  body,
  #__next {
    height:100%;
  }

  * {
    box-sizing: border-box;
  }
  

`;

const Container = styled.div<{ omitLayout: boolean }>`
  height: 100%;
  width: 100%;
  ${({ omitLayout }) =>
    omitLayout
      ? ""
      : css`
          overflow: scroll;
        `};
`;

type TPageProps = {};

type TProps = {
  pageProps: TPageProps | { statusCode: number };
  Component: ComponentType<TPageProps> & { pageStructure: TPageStructure };
};

export default function App({ Component, pageProps }: TProps) {
  const { pageStructure } = Component;
  if ("statusCode" in pageProps) {
    return "404";
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container omitLayout={!!pageStructure.omitLayout}>
        <GlobalStyles />
        <Head>
          <title>{`${pageStructure.title} | Leo Selig (.dev)`}</title>
          <meta name="description" content={metaData.description} />
          {faviconsHTMLData.map(({ nodeName, attributes }, index) =>
            createElement(nodeName, { ...attributes, key: index })
          )}
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&display=swap"
            rel="stylesheet"
          />
          {pageStructure.renderHeadComponents &&
            pageStructure.renderHeadComponents()}
        </Head>
        {pageStructure.omitLayout ? (
          <Component {...pageProps} />
        ) : (
          <PageLayout
            pageStructure={pageStructure}
            content={<Component {...pageProps} />}
            heroImage={<ProfilePhoto />}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}
