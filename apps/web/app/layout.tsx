import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";
import "@autoform/shadcn/globals.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { ColorSchemeScript } from "@mantine/core";

const theme = createTheme({});

export const metadata: Metadata = {
  title: "AutoForm Demo",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
