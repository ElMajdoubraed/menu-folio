import React from "react";
import { Item } from "@/types/item";
import { AddShoppingCart } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { Card, Row, Text, Button, Container } from "@nextui-org/react";
import { message } from "antd";

export default function ItemMenuCard({ name, price, image, id }: Item) {
  const [quantity, setQuantity] = React.useState(1);
  const orderHandler = () => {
    const currentOrder = localStorage.getItem("orders");
    if (currentOrder) {
      const parsedOrder = JSON.parse(currentOrder);
      const newOrder = {
        ...parsedOrder,
        items: [...parsedOrder.items, { id, quantity }],
      };
      // clean the order from duplicate items
      const filteredOrder = newOrder.items
        .reverse()
        .filter(
          (item: any, index: number, self: any) =>
            index === self.findIndex((t: any) => t.id === item.id)
        );
      localStorage.setItem("orders", JSON.stringify({ items: filteredOrder }));
    } else {
      const newOrder = {
        items: [{ id, quantity }],
      };
      localStorage.setItem("orders", JSON.stringify(newOrder));
    }
    message.success("تمت الإضافة إلى السلة بنجاح");
  };
  return (
    <Card isPressable>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={image}
          objectFit="cover"
          width="100%"
          height={140}
          alt={name}
        />
      </Card.Body>
      <Card.Footer css={{ justifyItems: "flex-start" }}>
        <Row wrap="wrap" justify="space-between" align="center">
          <Text b>{name}</Text>
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
      <Container
        style={{
          marginBottom: "2rem",
          marginTop: "1rem",
        }}
      >
        <Stack direction="row">
          <Button
            auto
            color="gradient"
            bordered
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </Button>
          <Typography
            sx={{
              width: "100%",
              textAlign: "center",
            }}
          >
            الكمية: {quantity}
          </Typography>
          <Button
            disabled={quantity <= 0}
            auto
            color="gradient"
            bordered
            onClick={() => setQuantity(quantity - 1)}
          >
            -
          </Button>
        </Stack>
        <Button
          disabled={quantity <= 0}
          onClick={orderHandler}
          css={{
            marginTop: "1rem",
            width: "100%",
          }}
          auto
          color="gradient"
          bordered
          title="أضف إلى السلة"
          icon={<AddShoppingCart />}
        />
      </Container>
    </Card>
  );
}
