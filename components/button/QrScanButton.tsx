import { Fab, Tooltip } from "@material-ui/core";
import { QrCode2 } from "@mui/icons-material";
import styled from "styled-components";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { Modal } from "@nextui-org/react";
import { message } from "antd";
import { Alert } from "@material-ui/lab";
import { useRouter } from "next/router";

const AnimatedFab = styled(Fab)`
  animation: bounce 1s;
  animation-iteration-count: 5;
  @keyframes bounce {
    0% {
      transform: rotate(0deg) translateX(0);
    }
    50% {
      transform: rotate(10deg) translateX(10px);
    }
    100% {
      transform: rotate(0deg) translateX(0);
    }
  }

  &:hover {
    animation: none;
  }
`;
export default function QrScanButton() {
  const [data, setData] = useState("لا توجد بيانات ");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false) as any;
  const router = useRouter();

  const verifyMenu = async (link: string) => {
    try {
      if (link && link.includes("https://menu.elmajdoub.live")) {
        const menuUrl = link.split("https://menu.elmajdoub.live")[1];
        router.push(menuUrl);
      } else {
        setError("حدث خطأ أثناء التحقق من القائمة");
      }
    } catch (error) {
      message.error("حدث خطأ أثناء التحقق من القائمة");
      setOpen(false);
    }
  };

  return (
    <>
      <Tooltip title="فحص QR Code" placement="top">
        <AnimatedFab
          className="fab__button"
          color="primary"
          aria-label="فحص QR Code"
          href="#scan"
          onClick={() => setOpen(true)}
        >
          <QrCode2 />
        </AnimatedFab>
      </Tooltip>
      <Modal open={open} onClose={() => setOpen(false)} closeButton>
        {error && (
          <Alert
            style={{
              marginTop: "20px",
            }}
            severity="error"
          >
            {error}
          </Alert>
        )}
        <QrReader
          onResult={(result: any, error) => {
            if (!!result) {
              setData(result?.text);
              verifyMenu(result?.text);
            }
            if (!!error) {
              setError(
                "حدث خطأ أثناء فحص QR Code. رجاء تأكد من الصورة و أن الكاميرا مفعلة"
              );
            }
          }}
          constraints={{ facingMode: "environment" }}
        />

        <p>{data}</p>
      </Modal>
    </>
  );
}
