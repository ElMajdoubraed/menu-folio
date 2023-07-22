import React from "react";
import SEO from "@bradgarropy/next-seo";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "@/site-settings/theme";
import RTL from "@/site-settings/RTL";
import { IntlProvider } from "react-intl";
import msgs from "@/site-settings/site-translations";
import { MainLayout } from "@/layouts";
import PropTypes from "prop-types";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <SEO
        title="قم بإنشاء قائمة الطعام خاصة بك على الإنترنت - MenuFolio"
        description="MenuFolio هي أفضل طريقة لإنشاء قائمة الطعام خاصة بك على الإنترنت."
        keywords={[
          "menu",
          "menu-folio",
          "menufolio",
          "menu folio",
          "menu online",
          "create menu",
          "create menu online",
        ]}
        icon="/favicon.ico"
        themeColor="#000000"
        colorScheme="light"
        facebook={{
          image: "/favicon.ico",
          url: "https://menu.elmajdoub.live",
          type: "website",
        }}
        twitter={{
          image: "/favicon.ico",
          site: "@menufolio",
          card: "summary",
        }}
      />
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER}');`,
        }}
      ></Script>
      <ThemeProvider theme={theme}>
        <IntlProvider locale="ar" messages={msgs["ar"]}>
          <RTL>
            <CssBaseline />
            <MainLayout>
              <Component {...pageProps} />
              <Analytics />
            </MainLayout>
          </RTL>
        </IntlProvider>
      </ThemeProvider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
