import { ReactNode } from "react";
import { Work_Sans } from "next/font/google";
import { Metadata, Viewport } from "next";
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

export const metadata = {
  icons: [] as IconDescriptor[],
  applicationName: faviconsHeadData.meta["application-name"],
} satisfies Metadata;

export const viewport: Viewport = {
  themeColor: faviconsHeadData.meta["theme-color"],
};

for (const link of faviconsHeadData.links) {
  if (link.rel === "icon") {
    metadata.icons.push({
      url: link.href,
      sizes: "sizes" in link ? link.sizes : undefined,
      type: link.type,
    });
  }
}
