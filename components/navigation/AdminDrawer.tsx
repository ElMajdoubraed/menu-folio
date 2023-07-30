import {
  Box,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  Button as MuiButton,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { Close, Edit, Delete } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { Button, Drawer, message } from "antd";
import axios from "axios";
import React from "react";
import { TextInput } from "@/components/inputs";

const AdminDrawerComponent = (props: any) => {
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [name, setName] = React.useState("");
  const [id, setId] = React.useState<String | undefined>();
  const deleteHandler = (id: string) => {
    if (!id) return;
    if (!window.confirm("هل انت متأكد من حذف هذا التصنيف؟")) return;
    message.loading("جاري حذف التصنيف");
    axios
      .delete(`/api/category/${id}?menu=${props.menuId}`)
      .then((res) => {
        message.success("تم حذف التصنيف بنجاح");
        props.setExistUpdate(!props.existUpdate);
      })
      .catch((err) => {
        message.error("حدث خطأ أثناء حذف التصنيف");
      });
  };
  const updateHandler = (event: any) => {
    event.preventDefault();
    if (!id) return;
    if (!name) return message.error("يجب ادخال اسم التصنيف");
    message.loading("جاري تعديل التصنيف");
    axios
      .put(`/api/category/${id}?menu=${props.menuId}`, {
        name,
      })
      .then((res) => {
        message.success("تم تعديل التصنيف بنجاح");
        props.setExistUpdate(!props.existUpdate);
        setOpenUpdate(false);
      })
      .catch((err) => {
        message.error("حدث خطأ أثناء تعديل التصنيف");
      });
    event.target.reset();
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
                  onClick={() => {
                    setOpenUpdate(true);
                    setName(item.name);
                    setId(item._id);
                  }}
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
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)}>
        <DialogTitle>تعديل التصنيف</DialogTitle>
        <DialogContent>
          <form onSubmit={updateHandler}>
            <TextInput
              label="اسم التصنيف"
              required
              variant="standard"
              name="name"
              value={name}
              onChange={(value: string) => setName(value)}
            />
            <MuiButton
              variant="contained"
              type="submit"
              color="primary"
              style={{
                marginTop: 10,
                width: "100%",
              }}
            >
              تعديل
            </MuiButton>
            <MuiButton
              type="reset"
              variant="outlined"
              color="secondary"
              style={{
                marginTop: 10,
                width: "100%",
                float: "right",
              }}
              onClick={() => setOpenUpdate(false)}
            >
              إلغاء
            </MuiButton>
          </form>
        </DialogContent>
      </Dialog>
    </Drawer>
  );
};

export default AdminDrawerComponent;
