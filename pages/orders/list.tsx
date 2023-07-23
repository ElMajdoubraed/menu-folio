import Head from "next/head";
import { PageLayout } from "@/layouts";
import { useState, useEffect } from "react";
import { map } from "lodash";
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
interface Order {
  name: string;
  quantity: number;
  price: number;
}

export default function GetOrders() {
  const [orders, setOrders] = useState([]) as any;
  const [totalPrice, setTotalPrice] = useState(0) as any;

  const calculateTotalPrice = () => {
    let total = 0;
    if (!orders) return total;
    orders.forEach((order: Order) => {
      total += Number(order.quantity) * Number(order.price);
    });
    return total;
  };
  useEffect(() => {
    //api call to get orders by menu id
    setOrders([
      {
        name: "kabeb",
        quantity: 2,
        price: 1.9,
      },
      {
        name: "kofta",
        quantity: 6,
        price: 19.2,
      },
      {
        name: "chicken",
        quantity: 2,
        price: 10,
      },
    ]);
    setTotalPrice(calculateTotalPrice());
  }, [totalPrice]);
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
                    {map(orders, (order: Order, index) => {
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
                            <IconButton>
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
                    onChange={() => {}}
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
                  <Button variant="contained" fullWidth color="primary">
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
