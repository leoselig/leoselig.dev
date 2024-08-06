import { join } from "path";
import { spawn } from "child_process";

import { remove, outputFileSync } from "fs-extra";
import { Element, load } from "cheerio";
import favicons from "favicons";

const FAVICONS_HEAD_DATA_FILE_PATH = "./common/favicons-html-head-data.ts";

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
    FAVICONS_HEAD_DATA_FILE_PATH,
    `export const faviconsHeadData = ${JSON.stringify(
      html$("head *")
        .toArray()
        .map((node) => {
          if (node.type === "tag") {
            return {
              attributes: node.attributes.reduce(
                (result, current) => ({
                  ...result,
                  [current.name]: current.value,
                }),
                {},
              ),
              nodeName: (node as Element).name,
            };
          }
          return null;
        })
        .filter(Boolean),
    )} as const`,
  );

  const eslintExitCode = await new Promise<number | null>((resolve) => {
    const eslintProcess = spawn(
      "npm",
      ["run", "eslint-base", "--", FAVICONS_HEAD_DATA_FILE_PATH, "--fix"],
      { stdio: "inherit" },
    );

    eslintProcess.on("exit", (code) => {
      resolve(code);
    });
  });
  process.exit(eslintExitCode);
})();
