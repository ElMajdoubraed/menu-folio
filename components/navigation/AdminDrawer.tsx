import { Box, Divider } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { Close, Edit, Delete } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { Button, Drawer, message } from "antd";
import axios from "axios";
import React from "react";

const AdminDrawerComponent = (props: any) => {
  const deleteHandler = (id: string) => {
    if (!id) return;
    if (!window.confirm("هل انت متأكد من حذف هذا التصنيف؟")) return;
    message.loading("جاري حذف التصنيف");
    axios
      .delete(`/api/category/${id}?menu=${props.menuId}`)
      .then((res) => {
        message.success("تم حذف التصنيف بنجاح");
        window.location.reload();
      })
      .catch((err) => {
        message.error("حدث خطأ أثناء حذف التصنيف");
      });
  };
  const updateHandler = (id: string) => {
    if (!id) return;
  };
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
          <React.Fragment key={index}>
            <Box
              sx={{
                width: "100%",
                alignContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Stack
                style={{
                  width: "100%",
                }}
                direction="row"
                spacing={2}
              >
                <IconButton
                  className="icon__btn"
                  onClick={() => console.log("update")}
                >
                  <Edit color="primary" fontSize="small" />
                </IconButton>
                {"  "}
                <IconButton
                  className="icon__btn"
                  onClick={() => deleteHandler(item._id)}
                >
                  <Delete color="error" fontSize="small" />
                </IconButton>
                <Button
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
              </Stack>
            </Box>
            <Divider
              style={{
                width: "100%",
                marginBottom: 10,
              }}
            />
          </React.Fragment>
        ))}
      </Box>
    </Drawer>
  );
};

export default AdminDrawerComponent;
