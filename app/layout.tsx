import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "High-Lvl Conversations with 19Keys",
  description: "Ideas for the people building, funding, and owning what comes next. Watch High-Lvl Conversations with 19Keys.",
  icons: {
    icon: "/assets/hlc-favicon.png",
    shortcut: "/assets/hlc-favicon.png",
    apple: "/assets/hlc-favicon.png",
  },
  openGraph: {
    title: "High-Lvl Conversations with 19Keys",
    description: "The future is in session.",
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 864, alt: "High-Lvl Conversations with 19Keys" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "High-Lvl Conversations with 19Keys",
    description: "The future is in session.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
