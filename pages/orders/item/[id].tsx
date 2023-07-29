import { PageLayout } from "@/layouts";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { Stack } from "@mui/material";
import { ItemDetailsCard } from "@/components/cards";
import axios from "axios";
import { message } from "antd";
export default function GetItem() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    nameCategory: "",
    nameMenu: "",
    imageMenu: "",
  });
  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/item/${id}/get`)
      .then((res) => {
        const item = res.data?.item;
        if (!item) return;
        setItem({
          name: item.name,
          price: item.price,
          description: item.description,
          image: item.image,
          nameCategory: item.category?.name,
          nameMenu: item.menu?.name,
          imageMenu: item.menu?.logo,
        });
      })
      .catch((err) => {
        message.error("حدث خطأ أثناء جلب معطيات العنصر");
      });
  }, [id]);
  return (
    <>
      <Head>
        <title>معطيات العنصر - MenuFolio</title>
        <meta name="description" content="معطيات العنصر - MenuFolio" />
      </Head>
      <PageLayout title="title.item-data">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 10 }}
          sx={{
            marginBottom: "2rem",
          }}
        >
          <Typography color="secondary">معطيات العنصر: {item.name}</Typography>
          <Typography color="secondary"></Typography>
          <Typography color="secondary">سعر العنصر: {item.price}</Typography>
          <Typography color="secondary">
            فئة العنصر : {item.nameCategory}
          </Typography>
          <Typography color="secondary">
            اسم القائمة : {item.nameMenu}
          </Typography>
        </Stack>
        <Box sx={{ marginTop: "2rem" }}>
          <ItemDetailsCard
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
            nameCategory={item.nameCategory}
            nameMenu={item.nameMenu}
            imageMenu={item.imageMenu}
          />
        </Box>
      </PageLayout>
    </>
  );
}
