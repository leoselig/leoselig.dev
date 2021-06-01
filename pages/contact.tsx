import styled from "styled-components";

import { Link } from "../common/Link";
import { contactData } from "../common/pageData";
import { SPACE_L, SPACE_M } from "../common/theme";

export default function ContactPage() {
  return (
    <SRoot>
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
    </SRoot>
  );
}

const SRoot = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-auto-flow: row;
  grid-column-gap: ${SPACE_M};
  grid-row-gap: ${SPACE_L};
`;

const SContactMethod = styled.div``;

const SContactData = styled.div`
  font-weight: 600;
`;

ContactPage.pageStructure = {
  id: "constact",
  title: "Contact",
};
