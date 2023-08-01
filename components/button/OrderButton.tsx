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
    const orders: any = JSON.parse(localStorage.getItem("orders") || "null");
    if (orders && orders.items) {
      setOrders(orders.items.length);
    }
  }, [fetching]);

  setTimeout(() => {
    setFetching(!fetching);
  }, 1000);
  return (
    <AnimatedFab
      className="fab__button"
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
