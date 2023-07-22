import { Fab } from "@material-ui/core";
import { QrCode2 } from "@mui/icons-material";
import styled from "styled-components";

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
      <QrCode2 />
    </AnimatedFab>
  );
}
