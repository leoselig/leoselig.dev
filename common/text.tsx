import styled, { css } from "styled-components";

import { fontWeightMap } from "./fonts";
import { pageXPadding } from "./layout/pageLayoutConfig";
import { responsive } from "./responsive";

const defaultTextStyles = css`
  line-height: 1.8em;
`;

const defaultHeadlineStyles = css<{ enableBackgroundEffect?: boolean }>`
  ${defaultTextStyles};
  margin: 0;

  ${({ enableBackgroundEffect = true }) =>
    enableBackgroundEffect &&
    css`
      background-color: ${({ theme }) => theme.colors.dark};
      color: ${({ theme }) => theme.colors.light};
      width: fit-content;
      padding: 0.1em;
      ${responsive({
        phone: css`
          margin-left: calc(-1 * ${pageXPadding.phone});
          padding-left: ${pageXPadding.phone};
        `,
        portrait: css`
          margin-left: calc(-1 * ${pageXPadding.portrait});
          padding-left: ${pageXPadding.portrait};
        `,
        landscape: css`
          margin-left: calc(-1 * ${pageXPadding.landscape});
          padding-left: ${pageXPadding.landscape};
        `,
        large: css`
          margin-left: calc(-1 * ${pageXPadding.large});
          padding-left: ${pageXPadding.large};
        `,
      })}
    `}
`;

export const Headline1 = styled.h1<{ enableBackgroundEffect?: boolean }>`
  ${defaultHeadlineStyles};
  font-size: 2.5rem;

  ${responsive({
    phone: css`
      font-size: 2rem;
    `,
  })}
`;

export const Headline3 = styled.h1<{ enableBackgroundEffect?: boolean }>`
  ${defaultHeadlineStyles};
  font-size: 1.5rem;

  ${responsive({
    phone: css`
      font-size: 1.25rem;
    `,
  })}
`;

export const Headline2 = styled.h1<{ enableBackgroundEffect?: boolean }>`
  ${defaultHeadlineStyles};
  font-size: 2rem;

  ${responsive({
    phone: css`
      font-size: 1.5rem;
    `,
  })}

  & + ${Headline3} {
    margin-top: 1.5em;
  }
`;

export const Paragraph = styled.p`
  ${defaultTextStyles};
  font-size: 1rem;
  font-weight: ${fontWeightMap.regular};
  margin: 0;
  white-space: pre-wrap;
  max-width: 800px;

  &:not(:first-child) {
    margin-top: 1em;
  }

  & + ${Headline1}, & + ${Headline2}, & + ${Headline3} {
    margin-top: 1.5em;
  }

  & + & {
    margin-top: 1em;
  }

  > br {
    height: 2em;
  }
`;
