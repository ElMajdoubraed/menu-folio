import React from "react";
import Head from "next/head";
import { OrderButton } from "@/components/button";
import { PageLayout } from "@/layouts";
import { Grid } from "@nextui-org/react";
import { Button, Typography } from "@material-ui/core";
import { map } from "lodash";
import { ItemMenuCard } from "@/components/cards";
import { DrawerComponent } from "@/components/navigation";
import { PlaylistPlay } from "@mui/icons-material";

export default function Menu() {
  const [open, setOpen] = React.useState(false) as any;
  const [selected, setSelected] = React.useState("");
  const [items, setItems] = React.useState([
    {
      name: "Kosksi",
      price: 10,
      image:
        "https://www.tunisie.fr/wp-content/uploads/2020/11/couscous-aux-cardons-e1358522791731.jpg",
      id: 1,
    },
  ]) as any;

  const chooseItem = (item: any) => {
    console.log(item);
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Head>
        <title>قائمة الطعام - MenuFolio</title>
        <meta name="description" content="قائمة الطعام - MenuFolio" />
      </Head>
      <PageLayout title="title.menu">
        <Grid.Container gap={2} justify="flex-start">
          <Grid xs={12} sm={3} md={3} key={"drawer"}>
            <Button
              endIcon={<PlaylistPlay />}
              variant="outlined"
              className="category__button"
              onClick={() => setOpen(!open)}
            >
              التصنيفات :{" "}
              <Typography noWrap>
                {selected ? selected.slice(0, 20) : "اختر تصنيفا"}
              </Typography>
            </Button>
            <DrawerComponent
              setSelected={setSelected}
              items={items}
              chooseItem={chooseItem}
              open={open}
              setOpen={setOpen}
            />
          </Grid>
          <Grid xs={12} sm={9} md={9} key={"content"}>
            <Grid.Container gap={2} justify="flex-start">
              {map(items, (item: any, index: number) => (
                <Grid xs={12} sm={4} md={4} key={index}>
                  <ItemMenuCard {...item} />
                </Grid>
              ))}
            </Grid.Container>
          </Grid>
        </Grid.Container>

        <OrderButton />
      </PageLayout>
    </React.Fragment>
  );
}
