

import "./globals.css";
import "../../public/assets/css/animate.min.css";
import "../../public/assets/css/bootstrap.min.css";
import "../../public/assets/css/font-awesome-pro.min.css";
import "../../public/assets/css/flaticon_gerold.css";
import "../../public/assets/css/nice-select.css";
import "../../public/assets/css/backToTop.css";
import "../../public/assets/css/owl.carousel.min.css";
import "../../public/assets/css/odometer-theme-default.css";
import "../../public/assets/css/magnific-popup.css";
import "../../public/assets/css/main.css";
import "../../public/assets/css/responsive.css";

import Layout from "../components/Layout";
import React from "react";
import { fetchAcfOptions, fetchSiteInfo } from "../services/wordpress";

export async function generateMetadata() {
  try {
    const info = await fetchSiteInfo();
    return {
      title: info?.name || "Site Title",
      description: info?.description || "Tagline goes here.",
    };
  } catch {
    return {
      title: "Site Title",
      description: "Tagline goes here.",
    };
  }

  try {
    const info = await fetchSiteInfo();
    return {
      title: info?.name || "Site Title",
      description: info?.description || "Tagline goes here.",
    };
  } catch {
    return {
      title: "Site Title",
      description: "Tagline goes here.",
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const acf = await fetchAcfOptions();
  const favicon = acf?.acf?.favicon?.url || "/assets/img/favicon.png";
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="apple-touch-icon" href={favicon} />
        <link rel="shortcut icon" type="image/png" href={favicon} />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
