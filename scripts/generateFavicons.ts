import { join } from "path";

import { removeSync, outputFileSync } from "fs-extra";
import { Element, load } from "cheerio";
import favicons from "favicons";

removeSync("./public/favicons");

favicons(
  "./public/profile-photo-black-white-contrast.svg",
  {
    path: "/favicons",
    logging: true,
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: false,
      coast: false,
      favicons: true,
      firefox: true,
      windows: true,
      yandex: false,
    },
  },
  (error, response) => {
    if (error) {
      console.error(error);
      throw error;
    }
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
          .filter(Boolean)
      )
    );
  }
);
