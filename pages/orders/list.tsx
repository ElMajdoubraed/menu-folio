import Head from "next/head";
import { PageLayout } from "@/layouts";
import { useState, useEffect } from "react";
import map from "lodash/map";
import {
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Grid,
} from "@mui/material";
import { Button, IconButton, TextField, Typography } from "@material-ui/core";
import { DeleteIcon } from "@/components/icons";
import { NoData } from "@/components/empty";
import { TablePlaceHolder } from "@/components/skeletons";
import { message } from "antd";
import axios from "axios";
interface Order {
  name: string;
  quantity: number;
  price: number;
}

const calculateTotalPrice = (orders: Order[]) => {
  let total = 0;
  if (!orders) return total;
  orders.forEach((order: Order) => {
    total += Number(order.quantity) * Number(order.price);
  });
  return total;
};

export default function GetOrders() {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderName, setOrderName] = useState("");

  const handleDeleteOrder = (index: number) => {
    if (window.confirm("هل أنت متأكد من حذف الطلب؟") === false) return;
    const newOrders = orders.filter((order: Order, i: number) => {
      return i !== index;
    });
    if (newOrders.length === 0) {
      localStorage.removeItem("orders");
      localStorage.removeItem("menu");
      setOrders([]);
    } else {
      setOrders(newOrders);
      localStorage.setItem("orders", JSON.stringify(newOrders));
    }

    setTotalPrice(calculateTotalPrice(newOrders));
  };

  const handleOrder = async () => {
    if (!orderName) {
      message.error("الرجاء إدخال اسم الطلب");
      return;
    }
    if (orders.length === 0) {
      message.error("الرجاء إضافة منتجات للطلب");
      return;
    }
    console.log(orders);
    await axios
      .post("/api/order", {
        name: orderName,
        totalPrice,
        items: orders,
        menu: localStorage.getItem("menu"),
      })
      .then((res) => {
        alert("تم إرسال الطلب بنجاح");
        localStorage.removeItem("orders");
        localStorage.removeItem("menu");
        setOrders([]);
        setTotalPrice(0);
      })
      .catch((err) => {
        message.error("حدث خطأ أثناء إرسال الطلب");
      });
  };

  useEffect(() => {
    const localOrders = JSON.parse(localStorage.getItem("orders") || "null");
    if (!localOrders) {
      setOrders([]);
      setTotalPrice(0);
      return;
    }
    setOrders(localOrders?.items);
    setTotalPrice(calculateTotalPrice(localOrders?.items));
  }, []);
  return (
    <>
      <Head>
        <title>الطلبات - MenuFolio</title>
        <meta name="description" content="الطلبات - MenuFolio" />
      </Head>
      <PageLayout title="header.orders">
        {orders ? (
          orders.length > 0 ? (
            <>
              <TableContainer component={Paper}>
                <Table
                  aria-label="Orders table"
                  sx={{
                    minWidth: "100%",
                    direction: "rtl",
                    ":lang": {
                      direction: "rtl",
                    },
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>الطلب</TableCell>
                      <TableCell>الكمية</TableCell>
                      <TableCell>السعر </TableCell>
                      <TableCell> السعر الجملي</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {map(orders, (order: Order, index: number) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{order.name}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>{order.price}</TableCell>
                          <TableCell>
                            {Number(order.quantity) * Number(order.price)}
                          </TableCell>
                          <TableCell
                            sx={{
                              float: "left",
                            }}
                          >
                            <IconButton
                              onClick={() => handleDeleteOrder(index)}
                            >
                              <DeleteIcon size={20} fill="#FF0080" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid
                sx={{
                  marginTop: "2rem",
                }}
                container
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Grid
                  item
                  sx={{
                    marginBottom: "1rem",
                  }}
                  xs={12}
                  md={5}
                >
                  <TextField
                    fullWidth
                    label="الاسم"
                    required
                    variant="outlined"
                    placeholder="الاسم"
                    onChange={(e) => {
                      setOrderName(e.target.value);
                    }}
                  />
                </Grid>
                <Grid
                  sx={{
                    marginBottom: "1rem",
                  }}
                  item
                  xs={12}
                  md={4}
                >
                  <Typography align="center">
                    السعر الجملي: {totalPrice}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    onClick={handleOrder}
                    variant="contained"
                    fullWidth
                    color="primary"
                  >
                    تأكيد الطلب
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : (
            <NoData description="لا توجد طلبات بعد" />
          )
        ) : (
          <TablePlaceHolder />
        )}
      </PageLayout>
    </>
  );
}
