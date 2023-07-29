import { QrScanButton } from "@/components/button";
import { Grid } from "@mui/material";
import { Container, Typography } from "@material-ui/core";
import Head from "next/head";
import {
  FaqHome,
  HowHome,
  MainHome,
  StartNowHome,
  UseCaseHome,
  WhyHome,
} from "@/components/home";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="google" content="notranslate" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=6.0, user-scalable=no"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <meta property="og:site_name" content="menu folio" />
        <meta property="og:locale" content="en" />
        <meta property="og:locale:alternate" content="en" />
        <meta
          property="og:description"
          content="MenuFolio هي أفضل طريقة لإنشاء قائمة خاصة بك على الإنترنت."
        />
        <meta property="og:title" content="Menufolio" />
        <meta property="og:image:height" content="256" />
        <meta property="og:image:width" content="256" />
        <meta property="og:url" content="https://menu.elmajdoub.live" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/icon-192x192.png" />
      </Head>
      <Container>
        <MainHome />
        <HowHome />
        <UseCaseHome />
        <WhyHome />
        <FaqHome />
        <StartNowHome />
        <QrScanButton />
      </Container>
    </>
  );
}
