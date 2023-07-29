import Head from "next/head";
import { PageLayout } from "@/layouts";
import { useEffect, useState } from "react";
import { map } from "lodash";
import { Grid } from "@mui/material";
import { MenuDetailsCard } from "@/components/cards";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { NoData } from "@/components/empty";
import { TablePlaceHolder } from "@/components/skeletons";

export default function Dashboard() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const [menus, setMenus] = useState() as any;
  useEffect(() => {
    axios.get("/api/menu").then((res) => {
      setMenus(res.data?.menus);
    });
  });

  return (
    <>
      <Head>
        <title>لوحة التحكم - MenuFolio</title>
        <meta
          name="description"
          content="قم بإنشاء قائمة الطعام الخاصة بك على الإنترنت."
        />
      </Head>
      <PageLayout title="title.dashboard">
        <Grid container spacing={2}>
          {menus ? (
            menus.length > 0 ? (
              map(menus, (menu, index) => {
                return (
                  <Grid item key={index} xs={12} md={4}>
                    <MenuDetailsCard
                      id={menu._id}
                      image={menu.logo}
                      name={menu.name}
                      description={menu.description}
                      link={menu.link}
                    />
                  </Grid>
                );
              })
            ) : (
              <NoData description="لا توجد قوائم بعد" />
            )
          ) : (
            <TablePlaceHolder />
          )}
        </Grid>
      </PageLayout>
    </>
  );
}
