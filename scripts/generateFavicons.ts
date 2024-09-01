import { join } from "path";
import { spawn } from "child_process";

import { remove, outputFileSync } from "fs-extra";
import { Element, load } from "cheerio";
import favicons from "favicons";
import { z } from "zod";

const FAVICONS_HEAD_DATA_FILE_PATH = "./common/favicons-html-head-data.ts";

const nodeLinkAttributesSchema = z.union([
  z.object({
    rel: z.literal("icon"),
    type: z.string(),
    sizes: z.string().optional(),
    href: z.string(),
  }),
  z.object({
    rel: z.literal("manifest"),
    href: z.string(),
  }),
  z.object({
    rel: z.literal("apple-touch-icon"),
    sizes: z.string(),
    href: z.string(),
  }),
  z.object({
    name: z.string(),
    content: z.string(),
  }),
]);
const faviconsNodeDataSchema = z.array(
  z.union([
    z.object({
      nodeName: z.literal("link"),
      attributes: nodeLinkAttributesSchema,
    }),
    z.object({
      nodeName: z.literal("meta"),
      attributes: z.object({
        name: z.string(),
        content: z.string(),
      }),
    }),
  ]),
);

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
      theme_color: "#fdfeff",
    },
  );

  const { images, files, html } = response;

  for (const file of [...images, ...files]) {
    outputFileSync(join("./public/favicons", file.name), file.contents);
  }
  const html$ = load(html.join(""));
  const nodeData = html$("head *")
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
    .filter(Boolean);

  const parsedNodeData = faviconsNodeDataSchema.parse(nodeData);

  const data = {
    links: [] as Array<z.infer<typeof nodeLinkAttributesSchema>>,
    meta: {} as Record<string, string>,
  };
  for (const nodeData of parsedNodeData) {
    if (nodeData.nodeName === "link") {
      data.links.push(nodeData.attributes);
    } else if (nodeData.nodeName === "meta") {
      data.meta[nodeData.attributes.name] = nodeData.attributes.content;
    }
  }

  outputFileSync(
    FAVICONS_HEAD_DATA_FILE_PATH,
    `export const faviconsHeadData = ${JSON.stringify(data)} as const`,
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
