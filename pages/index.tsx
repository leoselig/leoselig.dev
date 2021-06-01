import styled from "styled-components";

import { Markdown } from "../common/Markdown";
import { aboutMeData } from "../common/pageData";

const Container = styled.div``;

export default function AboutMePage() {
  return (
    <Container>
      <Markdown data={aboutMeData.content} />
    </Container>
  );
}

AboutMePage.pageStructure = {
  id: "aboutMe",
  title: "About Me",
};
