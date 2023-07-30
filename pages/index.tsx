import { QrScanButton } from "@/components/button";
import { motion } from "framer-motion";
import { Container } from "@material-ui/core";
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
          content="width=device-width, initial-scale=1, maximum-scale=5.0"
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
        <motion.section
          initial={{
            x: -200,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.2,
          }}
          id="main-section"
        >
          <MainHome />
        </motion.section>
        <motion.section
          id="how-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <HowHome />
        </motion.section>
        <motion.section
          id="usecase-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <UseCaseHome />
        </motion.section>
        <motion.section
          id="why-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <WhyHome />
        </motion.section>
        <motion.section
          id="faq-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <FaqHome />
        </motion.section>
        <motion.section
          id="start-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <StartNowHome />
        </motion.section>
        <QrScanButton />
      </Container>
    </>
  );
}
