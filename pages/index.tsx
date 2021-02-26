import styled from "styled-components";

import { Markdown } from "../common/Markdown";
import { getPageData } from "../common/pageData";

const Container = styled.div``;

const { aboutMe: rawAboutMeMarkdown } = getPageData();

export default function AboutMePage() {
  return (
    <Container>
      <Markdown data={rawAboutMeMarkdown} />
    </Container>
  );
}

AboutMePage.pageStructure = {
  id: "aboutMe",
  type: "SUB_PAGE",
  Title: function AboutMePageTitle() {
    return <div>About Me</div>;
  },
};
