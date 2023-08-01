import React from "react";
import { EditOutlined, QrcodeOutlined, DeleteFilled } from "@ant-design/icons";
import { Avatar, Card, message } from "antd";
import { Box, Typography, Button } from "@material-ui/core";
import { useQRCode } from "next-qrcode";
import { Modal, Button as BTN } from "@nextui-org/react";
import $ from "jquery";
import axios from "axios";
import Link from "next/link";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";

const { Meta } = Card;

const MenuDetailsCard = (props: any) => {
  const router = useRouter();
  const uploadUrl = process.env.NEXT_PUBLIC_S3_UPLOAD_URL;
  const { Canvas } = useQRCode();

  const [openModal, setOpenModal] = React.useState(false);

  const deleteHandler = () => {
    if (!window.confirm("هل انت متأكد من حذف القائمة؟")) return;
    message.loading("جاري حذف القائمة");
    axios
      .delete("/api/menu/" + props.id)
      .then((res: any) => {
        message.success("تم حذف القائمة بنجاح");
      })
      .catch((e: any) => {
        message.error("حدث خطأ أثناء حذف القائمة");
      });
  };

  const donloadQRCode = () => {
    try {
      const canvas: any = $("canvas")[0];
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink: any = $("<a>")[0];
      downloadLink.href = pngUrl;
      downloadLink.download = `${props.name} - qr.png`;
      $("body").append(downloadLink);
      downloadLink.click();
      $(downloadLink).remove();
      setOpenModal(false);
    } catch (error) {
      message.error("حدث خطأ أثناء تحميل QR Code");
      setOpenModal(false);
    }
  };

  return (
    <>
      <Card
        actions={[
          <DeleteFilled
            title="Delete menu"
            onClick={deleteHandler}
            key="Delete menu"
          />,
          <Link key="Edit menu" href={`/admin/update/${props.id}`}>
            <EditOutlined title="Update menu" />
          </Link>,
          <QrcodeOutlined
            onClick={() => setOpenModal(true)}
            title="Generate QR code"
            key="Generate QR code"
          />,
        ]}
        title={
          <Stack
            sx={{
              maxWidth: "100%",
            }}
            direction={{ xs: "column", sm: "row" }}
            spacing={0}
          >
            <Button className="responsive__btn">
              <Link href={`/menu/${props.id}/add-category`}>اضافة فئة</Link>
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button className="responsive__btn">
              <Link href={`/menu/${props.id}/update`}> تعديل العناصر</Link>
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button className="responsive__btn">
              <Link href={`/menu/${props.id}/add-item`}>اضافة عنصر</Link>
            </Button>
          </Stack>
        }
        hoverable
        style={{ width: "100%" }}
      >
        <Link
          style={{
            textDecoration: "none !important",
          }}
          href={`/menu/${props.id}/get-orders`}
        >
          <Meta
            avatar={<Avatar src={uploadUrl + "/" + props.image} />}
            title={props.name}
            description={
              <>
                <Typography noWrap>{props.description}</Typography>
                <Typography
                  align="right"
                  color="primary"
                  style={{
                    marginTop: "1rem",
                    fontSize: "0.8rem",
                  }}
                >
                  Link : {props.link}
                </Typography>
              </>
            }
          />
        </Link>
      </Card>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>QR Code</Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Canvas
            text={"https://menu.elmajdoub.live" + props.link}
            logo={{
              src: "/images/qr-bg.jpg",
              options: {
                width: 40,
              },
            }}
            options={{
              type: "image/jpeg",
              quality: 0.3,
              level: "Q",
              margin: 3,
              scale: 4,
              width: 200,
              color: {
                dark: "#333D51",
                light: "#D3AC2B",
              },
            }}
          />
          <BTN onClick={donloadQRCode} color="gradient" bordered>
            تحميل QR Code
          </BTN>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MenuDetailsCard;
