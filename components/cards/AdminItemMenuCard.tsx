import React from "react";
import { Item } from "@/types/item";
import { Stack, IconButton } from "@mui/material";
import { Card, Row, Text } from "@nextui-org/react";
import { Box, Container } from "@material-ui/core";
import { DeleteIcon, EditIcon } from "../icons";
import axios from "axios";
import { message } from "antd";

export default function AdminItemMenuCard({
  name,
  price,
  image,
  id,
  menuId,
}: Item) {
  const uploadUrl = process.env.NEXT_PUBLIC_S3_UPLOAD_URL;
  const deleteHandler = (id: string | undefined) => {
    if (!id) return;
    if (!window.confirm("هل انت متأكد من حذف هذا العنصر؟")) return;
    message.loading("جاري حذف العنصر");
    axios
      .delete(`/api/item/${id}?menu=${menuId}`)
      .then((res) => {
        message.success("تم حذف العنصر بنجاح");
        window.location.reload();
      })
      .catch((err) => {
        message.error("حدث خطأ أثناء حذف العنصر");
      });
  };
  return (
    <Card isPressable>
      <Card.Header>
        <Container>
          <Stack
            style={{
              width: "100%",
            }}
            direction="row"
            spacing={2}
          >
            <Text b>{name}</Text>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              className="icon__btn"
              onClick={() => console.log("update")}
            >
              <EditIcon size={20} fill="#3f50b5" />
            </IconButton>
            {"  "}
            <IconButton className="icon__btn" onClick={() => deleteHandler(id)}>
              <DeleteIcon size={20} fill="#f44336" />
            </IconButton>
          </Stack>
        </Container>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={uploadUrl + "/" + image}
          objectFit="cover"
          width="100%"
          height={140}
          alt={name}
        />
      </Card.Body>
      <Card.Footer css={{ justifyItems: "flex-start" }}>
        <Row wrap="wrap" justify="space-between" align="center">
          <Text
            css={{
              color: "$accents7",
              fontWeight: "$semibold",
              fontSize: "$sm",
            }}
          >
            {price} $
          </Text>
        </Row>
      </Card.Footer>
    </Card>
  );
}
