import Head from "next/head";
import { PageLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { map } from "lodash";
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
import { DeleteIcon, EyeIcon } from "@/components/icons";
import { StyledBadge } from "@/components/badges";
import Link from "next/link";
interface Order {
  id: string;
  name: string;
  status: "قيد الانتظار" | "مكتمل" | "ملغي";
  time: string;
  variant: "completed" | "cancelled" | "pending";
}

export default function GetOrders() {
  const router = useRouter();
  const { id } = router.query;
  const [orders, setOrders] = useState([]) as any;

  useEffect(() => {
    //api call to get orders by menu id
    setOrders([
      {
        id: "1",
        name: "محمد",
        status: "مكتمل",
        time: Date.now(),
        variant: "completed",
      },
      {
        id: "1",
        name: "محمد",
        status: "مكتمل",
        time: Date.now(),
        variant: "completed",
      },
      {
        id: "1",
        name: "محمد",
        status: "مكتمل",
        time: Date.now(),
        variant: "completed",
      },
      {
        id: "1",
        name: "محمد",
        status: "مكتمل",
        time: Date.now(),
        variant: "completed",
      },
      {
        id: "1",
        name: "محمد",
        status: "مكتمل",
        time: Date.now(),
        variant: "completed",
      },
    ]);
  }, []);
  return (
    <>
      <Head>
        <title>الطلبات الواردة - MenuFolio</title>
        <meta name="description" content="الطلبات - MenuFolio" />
      </Head>
      <PageLayout title="title.get-orders">
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
                    <TableCell>{moment(order.time).format("LLLL")}</TableCell>
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
                        <IconButton>
                          <DeleteIcon size={20} fill="#FF0080" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </PageLayout>
    </>
  );
}
