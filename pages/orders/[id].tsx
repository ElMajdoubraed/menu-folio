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
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { message } from "antd";

interface Order {
  name: string;
  totalPrice: number;
  status: string;
  variant: "pending" | "completed" | "cancelled";
  createdAt?: string | number;
  items: any[];
}

interface OrderDetails {
  name: string;
  quantity: number;
  price: number;
}
export default function GetOrders() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const router = useRouter();
  const { id } = router.query;
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState<Order | undefined>();
  const [status, setStatus] = useState("قيد الانتظار");
  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/order/${id}`)
      .then((res) => {
        setOrderDetails(res.data?.order);
      })
      .catch((err) => {
        message.error("حدث خطأ ما");
      });
  }, [id]);

  useEffect(() => {
    if (!id || !orderDetails) return;
    const items = orderDetails?.items;
    const newItems: any = map(items, (_item: any) => {
      return {
        name: _item?.item?.name,
        price: _item?.item?.price,
        quantity: _item?.quantity,
      };
    });
    setOrders(newItems);
  }, [id, orderDetails]);

  const updateOrderStatus = async () => {
    if (!id || !status) return;
    await axios
      .put(`/api/order/${id}`, {
        status,
      })
      .then((res) => {
        message.success("تم تحديث حالة الطلب بنجاح");
        window.location.reload();
      })
      .catch((err) => {
        message.error("حدث خطأ ما");
      });
  };
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
            مراجعة الطلب الوارد: {orderDetails?.name}
          </Typography>
          <Typography color="secondary"> </Typography>
          <Typography color="secondary">
            السعر الجملي: {orderDetails?.totalPrice}
          </Typography>
          <Typography color="secondary">
            الحالة:
            <StyledBadge type={orderDetails?.variant}>
              {orderDetails?.status}
            </StyledBadge>
          </Typography>
          <Typography color="secondary">
            الوقت: {moment(orderDetails?.createdAt).fromNow()}
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
                    {map(orders, (order: OrderDetails, index) => {
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
                  <Button
                    onClick={() => updateOrderStatus()}
                    variant="contained"
                    color="primary"
                  >
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
                        onChange={() => setStatus("قيد الانتظار")}
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
                        onChange={() => setStatus("مكتمل")}
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
                        onChange={() => setStatus("ملغي")}
                        label="ملغي"
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
