import styled from "styled-components";

import { imprintData } from "../common/pageData";
import { Markdown } from "../common/Markdown";

export default function ImprintPage() {
  return (
    <SRoot>
      <Markdown data={imprintData.content} />
    </SRoot>
  );
}

const SRoot = styled.div``;

ImprintPage.pageStructure = {
  id: "cv",
  omitLayout: true,
  title: "CV",
};
