import { join } from "path";

import { remove, outputFileSync } from "fs-extra";
import { Element, load } from "cheerio";
import favicons from "favicons";

(async () => {
  await remove("./public/favicons");

  const response = await favicons(
    "./public/profile-photo-black-white-contrast.svg",
    {
      appName: "Leo Selig, Freelancing Software Engineer",
      appShortName: "Leo Selig",
      appDescription: "Leo Selig, Freelancing Software Engineer",
      path: "/favicons",
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        favicons: true,
        windows: true,
        yandex: false,
      },
    },
  );

  const { images, files, html } = response;

  for (const file of [...images, ...files]) {
    outputFileSync(join("./public/favicons", file.name), file.contents);
  }
  const html$ = load(html.join(""));

  outputFileSync(
    "./public/favicons/html-head-data.json",
    JSON.stringify(
      html$("head *")
        .toArray()
        .map((node) => {
          if (node.type === "tag") {
            return {
              nodeName: (node as Element).name,
              attributes: (node as Element).attribs,
            };
          }
          return null;
        })
        .filter(Boolean),
    ),
  );
})();
