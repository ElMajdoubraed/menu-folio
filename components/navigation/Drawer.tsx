import { Box } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Button, Drawer } from "antd";

const DrawerComponent = (props: any) => {
  return (
    <Drawer
      title="التصنيفات"
      placement="left"
      closable={false}
      onClose={() => props.setOpen(false)}
      open={props.open}
      mask={false}
      style={{
        height: "100% !important",
      }}
    >
      <Box
        sx={{
          alignContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <IconButton
          sx={{
            marginBottom: "1.5rem !important",
          }}
          onClick={() => props.setOpen(false)}
        >
          <Close
            sx={{
              color: red[500],
            }}
          />
        </IconButton>
        {props.items?.map((item: any, index: number) => (
          <Button
            key={index}
            style={{
              width: "100%",
              marginBottom: 10,
            }}
            onClick={() => {
              props.chooseItem(item);
              props.setSelected(item.name);
            }}
          >
            {item.name.slice(0, 20)}
          </Button>
        ))}
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
