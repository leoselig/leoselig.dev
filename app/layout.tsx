import { ReactNode } from "react";
import { Work_Sans } from "next/font/google";
import { Metadata } from "next";
import { IconDescriptor } from "next/dist/lib/metadata/types/metadata-types";
import "./global.css";

import { faviconsHeadData } from "../common/favicons-html-head-data";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-family-default",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={workSans.className}>
      <body>{children}</body>
    </html>
  );
}

const metadataFromFaviconHeadData = {
  icons: [] as IconDescriptor[],
} satisfies Metadata;

for (const entry of faviconsHeadData) {
  if (entry.nodeName === "link") {
    const { attributes } = entry;
    if (attributes.rel === "icon") {
      attributes.rel === "icon";
      metadataFromFaviconHeadData.icons.push({
        url: attributes.href,
        sizes: "sizes" in attributes ? attributes.sizes : undefined,
        type: attributes.type,
      });
    }
  }
}

export const metadata: Metadata = {
  ...metadataFromFaviconHeadData,
};
