import Head from "next/head";
import { PageLayout } from "@/layouts";
import { useRouter } from "next/router";
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
  Stack,
} from "@mui/material";
import {
  Button,
  Typography,
  FormLabel,
  FormControlLabel,
} from "@material-ui/core";
import { FormControl, RadioGroup, Radio } from "@mui/material";
import { yellow, red, green } from "@mui/material/colors";
import { NoData } from "@/components/empty";
import { TablePlaceHolder } from "@/components/skeletons";
import { StyledBadge } from "@/components/badges";
import moment from "@/utils/moment";

interface Order {
  name: string;
  totalPrice: number;
  status: string;
  variant: "pending" | "completed" | "cancelled";
  time?: string | number;
}

export default function GetOrders() {
  const router = useRouter();
  const { id } = router.query;
  const [orders, setOrders] = useState([]) as any;
  const [orderDetails, setOrderDetails] = useState<Order>({
    name: "raed elmajdoub",
    totalPrice: 0,
    status: "قيد المراجعة",
    variant: "pending",
    time: Date.now(),
  });
  useEffect(() => {
    //api get order by id (setDetails, and set orders for items)
    setOrders([
      {
        name: "منيو 1",
        price: 10,
        quantity: 2,
      },
      {
        name: "منيو 2",
        price: 10,
        quantity: 2,
      },
    ]);
  }, []);
  return (
    <>
      <Head>
        <title>مراجعة الطلب - MenuFolio</title>
        <meta name="description" content="مراجعة الطلب الوارد - MenuFolio" />
      </Head>
      <PageLayout title="title.review-orders">
        <Stack
          direction="row"
          spacing={10}
          sx={{
            marginBottom: "2rem",
          }}
        >
          <Typography color="secondary">
            مراجعة الطلب الوارد: {orderDetails.name}
          </Typography>
          <Typography color="secondary"> </Typography>
          <Typography color="secondary">
            السعر الجملي: {orderDetails.totalPrice}
          </Typography>
          <Typography color="secondary">
            الحالة:
            <StyledBadge type={orderDetails.variant}>
              {orderDetails.status}
            </StyledBadge>
          </Typography>
          <Typography color="secondary">
            الوقت: {moment(orderDetails.time).fromNow()}
          </Typography>
        </Stack>
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {map(orders, (order: any, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{order.name}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>{order.price}</TableCell>
                          <TableCell>
                            {Number(order.quantity) * Number(order.price)}
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
                <Grid item xs={12} md={3}>
                  <Button variant="contained" color="primary">
                    حفظ التغييرات
                  </Button>
                </Grid>
                <Grid item xs={12} md={5}>
                  <FormControl
                    component="fieldset"
                    sx={{ mt: 1, display: "flex" }}
                  >
                    <FormLabel
                      component="legend"
                      style={{
                        marginBottom: "1rem",
                      }}
                    >
                      تغيير حالة الطلب
                    </FormLabel>
                    <RadioGroup aria-label="direction" name="direction" row>
                      <FormControlLabel
                        value="قيد الانتظار"
                        style={{
                          marginRight: "1rem",
                        }}
                        control={
                          <Radio
                            sx={{
                              "&.Mui-checked": {
                                color: yellow[600],
                              },
                            }}
                          />
                        }
                        label="قيد الانتظار"
                      />
                      <FormControlLabel
                        style={{
                          marginRight: "1rem",
                        }}
                        value="مكتمل"
                        control={
                          <Radio
                            sx={{
                              "&.Mui-checked": {
                                color: green[600],
                              },
                            }}
                          />
                        }
                        label="مكتمل"
                      />
                      <FormControlLabel
                        style={{
                          marginRight: "1rem",
                        }}
                        value="ملغى"
                        control={
                          <Radio
                            sx={{
                              "&.Mui-checked": {
                                color: red[600],
                              },
                            }}
                          />
                        }
                        label="ملغى"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </>
          ) : (
            <NoData />
          )
        ) : (
          <TablePlaceHolder />
        )}
      </PageLayout>
    </>
  );
}
