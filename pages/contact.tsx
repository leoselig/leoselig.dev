import styled from "styled-components";

import { getPageData } from "../common/pageData";
import { Markdown } from "../common/Markdown";

const contactPageData = getPageData().contact;

export default function ContactPage() {
  return (
    <SRoot>
      <Markdown data={contactPageData.content} />
    </SRoot>
  );
}

const SRoot = styled.div``;

ContactPage.pageStructure = {
  id: "constact",
  type: "SUB_PAGE",
  Title: function ContactPageTitle() {
    return <div>Contact</div>;
  },
};
