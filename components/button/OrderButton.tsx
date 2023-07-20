import { Fab } from "@material-ui/core";
import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import styled from "styled-components";
import { useEffect, useState } from "react";

const AnimatedFab = styled(Fab)`
  animation: bounce 1s;
  animation-iteration-count: 5;
  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }

  &:hover {
    animation: none;
  }
`;

export default function OrderButton() {
  const [orders, setOrders] = useState(0);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    const orders = localStorage.getItem("orders");
    if (orders) {
      setOrders(JSON.parse(orders).length);
    }
  }, [fetching]);

  setTimeout(() => {
    setFetching(!fetching);
  }, 1000);
  return (
    <AnimatedFab
      style={{
        position: "fixed",
        bottom: "100px",
        right: "100px",
        zIndex: 100,
      }}
      color="primary"
      aria-label="add"
      href="/orders/list"
    >
      <Badge badgeContent={orders} color="error">
        <ShoppingCart />
      </Badge>
    </AnimatedFab>
  );
}
