import { ReactNode } from "react";

import { PageLayout, ProfilePhoto } from "../../common/layout";

export default function RootLayout({ children }: { children: ReactNode }) {
  return <PageLayout content={children} heroImage={<ProfilePhoto />} />;
}
