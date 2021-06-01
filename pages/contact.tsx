import styled from "styled-components";

import { contactData } from "../common/pageData";
import { Markdown } from "../common/Markdown";

export default function ContactPage() {
  return (
    <SRoot>
      <Markdown data={contactData.content} />
    </SRoot>
  );
}

const SRoot = styled.div``;

ContactPage.pageStructure = {
  id: "constact",
  title: "Contact",
};
