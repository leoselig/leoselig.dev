import styled from "styled-components";

import { getPageData } from "../common/pageData";
import { Markdown } from "../common/Markdown";

const imprintPageData = getPageData().imprint;

export default function ImprintPage() {
  return (
    <SRoot>
      <Markdown data={imprintPageData.content} />
    </SRoot>
  );
}

const SRoot = styled.div``;

ImprintPage.pageStructure = {
  id: "imprint",
  title: "Imprint",
};
