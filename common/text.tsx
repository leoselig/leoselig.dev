import styled, { css } from "styled-components";

const defaultHheadlienStyles = css`
  margin: 0;
`;

export const Headline1 = styled.h1`
  ${defaultHheadlienStyles}
  font-size: 2.5rem;
`;

export const Headline3 = styled.h1`
  ${defaultHheadlienStyles}
  font-size: 1.5rem;
`;

export const Headline2 = styled.h1`
  ${defaultHheadlienStyles}
  font-size: 2rem;

  & + ${Headline3} {
    margin-top: 1.5em;
  }
`;

export const Paragraph = styled.p`
  font-size: 1.2rem;
  margin: 0;
  white-space: pre-wrap;

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
