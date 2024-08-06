import { imprintData } from "../common/pageData";
import { Markdown } from "../common/Markdown";

export default function ImprintPage() {
  return (
    <div>
      <Markdown data={imprintData.content} />
    </div>
  );
}

ImprintPage.pageStructure = {
  id: "imprint",
  title: "Imprint",
};
