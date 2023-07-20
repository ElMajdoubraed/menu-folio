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
      <ThemeProvider theme={theme}>
        <IntlProvider locale="ar" messages={msgs["ar"]}>
          <RTL>
            <CssBaseline />
            <MainLayout>
              <Component {...pageProps} />
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
