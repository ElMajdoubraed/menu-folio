import React from "react";
import { EditOutlined, QrcodeOutlined, DeleteFilled } from "@ant-design/icons";
import { Avatar, Card, message } from "antd";
import { Typography } from "@material-ui/core";
import { useQRCode } from "next-qrcode";
import { Button, Modal } from "@nextui-org/react";
import $ from "jquery";

const { Meta } = Card;

const MenuDetailsCard = (props: any) => {
  const { Canvas } = useQRCode();

  const [openModal, setOpenModal] = React.useState(false);

  const updateHandler = () => {
    console.log("i");
  };
  const deleteHandler = () => {
    console.log("i");
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
      console.error(error);
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
          <EditOutlined title="Update menu" key="Edit menu" />,
          <QrcodeOutlined
            onClick={() => setOpenModal(true)}
            title="Generate QR code"
            key="Generate QR code"
          />,
        ]}
      >
        <Meta
          avatar={<Avatar src={props.image} />}
          title={props.name}
          description={
            <>
              <Typography noWrap>{props.description}</Typography>
              <Typography
                align="right"
                color="primary"
                style={{
                  marginTop: "1rem",
                }}
              >
                {props.link}
              </Typography>
            </>
          }
        />
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
            text={props.link}
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
          <Button onClick={donloadQRCode} color="gradient" bordered>
            تحميل QR Code
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MenuDetailsCard;
