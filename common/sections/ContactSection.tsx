import styled from "styled-components";
import { css } from "styled-components";
import { ComponentProps } from "react";

import { Link } from "../Link";
import { contactData } from "../pageData";
import { Headline2 } from "../text";

type Props = ComponentProps<typeof SRoot>;

export default function ContactSection({ ...otherProps }: Props) {
  return (
    <SRoot {...otherProps}>
      <Headline2>Reach out</Headline2>
      <SContactMethodGrid>
        <SContactMethod>{contactData.labels.phone}:</SContactMethod>
        <SContactData>
          <Link to={`tel:${contactData.phoneNumber.replace(/[ ()\-]/g, "")}`}>
            {contactData.phoneNumber}
          </Link>
        </SContactData>
        <SContactMethod>{contactData.labels.email}:</SContactMethod>
        <SContactData>
          <Link to={`mailto:${contactData.emailAddress}`}>
            {contactData.emailAddress}
          </Link>
        </SContactData>

        <SContactMethod>{contactData.labels.signal}:</SContactMethod>
        <SContactData $monospace>{contactData.signalUsername}</SContactData>
      </SContactMethodGrid>
    </SRoot>
  );
}

const SRoot = styled.div``;

const SContactMethodGrid = styled.div`
  margin-top: var(--space-m);

  display: grid;
  grid-template-columns: auto 1fr;
  grid-auto-flow: row;
  gap: var(--space-m);
`;

const SContactMethod = styled.div``;

const SContactData = styled.div<{ $monospace?: boolean }>`
  font-weight: 600;
  ${({ $monospace }) =>
    $monospace &&
    css`
      font-family: "Courier New", Courier, monospace;
    `}
`;
