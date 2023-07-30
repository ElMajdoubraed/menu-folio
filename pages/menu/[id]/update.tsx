import React from "react";
import Head from "next/head";
import { PageLayout } from "@/layouts";
import { Grid } from "@nextui-org/react";
import { Button, Typography } from "@material-ui/core";
import map from "lodash/map";
import { AdminItemMenuCard } from "@/components/cards";
import { AdminDrawerComponent } from "@/components/navigation";
import { PlaylistPlay } from "@mui/icons-material";
import { useRouter } from "next/router";
import axios from "axios";
import { message } from "antd";
import useAuth from "@/hooks/useAuth";

export default function Menu() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const [open, setOpen] = React.useState(false) as any;
  const [selected, setSelected] = React.useState("");
  const [items, setItems] = React.useState() as any;
  const [categories, setCategories] = React.useState() as any;
  const [existUpdate, setExistUpdate] = React.useState(false);

  React.useEffect(() => {
    if (!id) return;
    axios.get(`/api/menu/${id}/categories`).then((res) => {
      setCategories(res.data?.categories);
      if (res.data?.categories?.length > 0) {
        setSelected(res.data?.categories[0]?.name);
        const _id = res.data?.categories[0]?.id;
        axios
          .get(`/api/category/get/${_id}`)
          .then((res) => {
            setItems(res.data?.items);
          })
          .catch((err) => {
            message.error("حدث خطأ ما");
          });
      }
    });
  }, [id, existUpdate]);
  const chooseItem = async (item: any) => {
    axios
      .get(`/api/category/get/${item._id}`)
      .then((res) => {
        setItems(res.data?.items);
      })
      .catch((err) => {
        message.error("حدث خطأ ما");
      });
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
            <AdminDrawerComponent
              setSelected={setSelected}
              items={categories}
              menuId={id}
              chooseItem={chooseItem}
              open={open}
              setOpen={setOpen}
              setExistUpdate={setExistUpdate}
              existUpdate={existUpdate}
            />
          </Grid>
          <Grid xs={12} sm={9} md={9} key={"content"}>
            <Grid.Container gap={2} justify="flex-start">
              {map(items, (item: any, index: number) => (
                <Grid xs={12} sm={4} md={4} key={index}>
                  <AdminItemMenuCard menuId={id} {...item} />
                </Grid>
              ))}
            </Grid.Container>
          </Grid>
        </Grid.Container>
      </PageLayout>
    </React.Fragment>
  );
}
