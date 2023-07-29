import React from "react";
import { Result } from "antd";
import { Typography, Paper, Button } from "@material-ui/core";
import { Cached } from "@mui/icons-material";
import styled from "styled-components";
import { red } from "@material-ui/core/colors";
import Router from "next/router";
import Head from "next/head";

const AnimatedReload = styled(Cached)`
  animation: spin 5s linear infinite;
  color: ${red[500]};
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(359deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;
const Offline: React.FC = () => (
  <>
    <Head>
      <title>انت غير متصل. 📵</title>
      <meta
        name="description"
        content="
            انت غير متصل. الرجاء التحقق من اتصال الانترنت الخاص بك.
        "
      />
    </Head>
    <Paper>
      <Result
        status="error"
        title={<Typography>انت غير متصل.</Typography>}
        subTitle={
          <Typography>
            انت غير متصل. الرجاء التحقق من اتصال الانترنت الخاص بك.
          </Typography>
        }
        extra={[
          <Button
            key="reload"
            style={{
              marginTop: "2rem",
            }}
            onClick={() => Router.reload()}
            variant="outlined"
            color="secondary"
            endIcon={<AnimatedReload />}
          >
            إعادة المحاولة
          </Button>,
        ]}
      ></Result>
    </Paper>
  </>
);

export default Offline;
