import "./globals.css";
import { Header } from "../components/header/Header";

import { mainMenu } from "../__content-og/main-menu";
import { Analytics } from "@vercel/analytics/next";

const siteName = "next-image-plus";
export const metadata = {
  // This sets the base url for metatags that use urls.
  metadataBase: new URL("https://next-image-plus.vercel.app"),
  title: {
    template: `%s | ${siteName}`,
    default: siteName,
  },
  keywords: "next, react, nextjs, responsive images, typescript",
  openGraph: {
    title: {
      template: `%s | ${siteName}`,
      default: siteName,
    },
    siteName: siteName,
    type: "website",
  },
  twitter: {
    title: {
      template: `%s | ${siteName}`,
      default: siteName,
    },
    card: "summary",
    site: siteName,
    creator: "@wluisi",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="dark:bg-zinc-900 dark:text-zinc-100">
        <Header id={mainMenu.id} menuItems={mainMenu.items} />
        <div id="page-layout" className="container mx-auto px-3 py-4">
          <main role="main">{children}</main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
