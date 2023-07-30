import Head from "next/head";
import { PageLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import map from "lodash/map";
import moment from "@/utils/moment";
import {
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Stack,
} from "@mui/material";
import { IconButton } from "@material-ui/core";
import { EyeIcon } from "@/components/icons";
import { StyledBadge } from "@/components/badges";
import Link from "next/link";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { message } from "antd";
import { TablePlaceHolder } from "@/components/skeletons";
import { NoData } from "@/components/empty";
interface Order {
  id: string;
  name: string;
  status: "قيد الانتظار" | "مكتمل" | "ملغي";
  createdAt: string;
  variant: "completed" | "cancelled" | "pending";
}

export default function GetOrders() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const router = useRouter();
  const { id } = router.query;
  const [orders, setOrders] = useState() as any;

  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/menu/${id}/orders`)
      .then((res) => {
        setOrders(res.data?.orders);
      })
      .catch((err) => {
        message.error("حدث خطأ أثناء جلب الطلبات");
      });
  }, [id]);
  return (
    <>
      <Head>
        <title>الطلبات الواردة - MenuFolio</title>
        <meta name="description" content="الطلبات - MenuFolio" />
      </Head>
      <PageLayout title="title.get-orders">
        <TableContainer component={Paper}>
          {orders ? (
            orders.length > 0 ? (
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
                    <TableCell>المشتري</TableCell>
                    <TableCell>حالة الطلب</TableCell>
                    <TableCell>وقت الطلب</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {map(orders, (order: Order, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{order.name}</TableCell>
                        <TableCell>
                          <StyledBadge type={order.variant}>
                            {order.status}
                          </StyledBadge>
                        </TableCell>
                        <TableCell>
                          {moment(order.createdAt).fromNow()}
                        </TableCell>
                        <TableCell
                          sx={{
                            float: "left",
                          }}
                        >
                          <Stack direction="row" spacing={1}>
                            <IconButton>
                              <Link href={`/orders/${order.id}`}>
                                <EyeIcon size={20} fill="#979797" />
                              </Link>
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <NoData description="لا توجد طلبات بعد" />
            )
          ) : (
            <TablePlaceHolder />
          )}
        </TableContainer>
      </PageLayout>
    </>
  );
}
