import React from "react";
import Head from "next/head";
import { OrderButton } from "@/components/button";
import { PageLayout } from "@/layouts";
import { Grid } from "@nextui-org/react";
import { map } from "lodash";
import { ItemMenuCard } from "@/components/cards";

export default function Menu() {
  const [items, setItems] = React.useState([
    {
      name: "Kosksi",
      price: 10,
      image:
        "https://www.tunisie.fr/wp-content/uploads/2020/11/couscous-aux-cardons-e1358522791731.jpg",
      id: 1,
    },
    {
      name: "Kosksi",
      price: 10,
      image:
        "https://www.tunisie.fr/wp-content/uploads/2020/11/couscous-aux-cardons-e1358522791731.jpg",
      id: 2,
    },
    {
      name: "Kosksi",
      price: 10,
      image:
        "https://www.tunisie.fr/wp-content/uploads/2020/11/couscous-aux-cardons-e1358522791731.jpg",
      id: 3,
    },
  ]) as any;
  return (
    <React.Fragment>
      <Head>
        <title>قائمة الطعام - MenuFolio</title>
        <meta name="description" content="قائمة الطعام - MenuFolio" />
      </Head>
      <PageLayout title="title.menu">
        <Grid.Container gap={2} justify="flex-start">
          {map(items, (item: any, index: number) => (
            <Grid xs={6} sm={3} key={index}>
              <ItemMenuCard {...item} />
            </Grid>
          ))}
        </Grid.Container>
        <OrderButton />
      </PageLayout>
    </React.Fragment>
  );
}
