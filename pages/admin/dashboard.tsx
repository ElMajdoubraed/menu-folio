{
  /*
    lena bch todhher l menus kol ili zayedhom l admin maahom button delete
    l edit bch tkon kn fil link w name w description
    genrate qr code
  */
}

import Head from "next/head";
import { PageLayout } from "@/layouts";
import { useState } from "react";
import { map } from "lodash";
import { Grid } from "@mui/material";
import { MenuDetailsCard } from "@/components/cards";

export default function Dashboard() {
  const [menus, setMenus] = useState([
    {
      name: "menu1",
      id: 1,
      logo: "https://picsum.photos/200",
      description:
        "menu1 is a good menu for sea food lovers, this menu contains a lot of sea food dishes and drinks and desserts and more",
      link: "https://menufolio.com/menu1",
    },
  ]);
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
          {map(menus, (menu, index) => {
            return (
              <Grid item key={index} xs={12} md={4}>
                <MenuDetailsCard
                  image={menu.logo}
                  name={menu.name}
                  description={menu.description}
                  link={menu.link}
                />
              </Grid>
            );
          })}
        </Grid>
      </PageLayout>
    </>
  );
}
