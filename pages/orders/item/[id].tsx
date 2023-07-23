import { PageLayout } from "@/layouts";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "@/utils/moment";
import { Box, Typography } from "@material-ui/core";
import { Stack } from "@mui/material";
import { ItemDetailsCard } from "@/components/cards";
import ItemDetails from "@/types/item";
export default function GetItem() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState({
    name: "Kosksi",
    price: 10,
    description:
      "Kosksi is a tunisian food that is very delicious and tasty with a lot of spices and vegetables and meat.",
    image:
      "https://www.tunisie.fr/wp-content/uploads/2020/11/couscous-aux-cardons-e1358522791731.jpg",
    nameCategory: " فئة  1",
    nameMenu: "منيو 1",
    imageMenu:
      "https://img.freepik.com/premium-vector/restaurant-logo-design-template_79169-56.jpg?w=2000",
  });
  return (
    <>
      <Head>
        <title>معطيات العنصر - MenuFolio</title>
        <meta name="description" content="معطيات العنصر - MenuFolio" />
      </Head>
      <PageLayout title="title.item-data">
        <Stack
          direction="row"
          spacing={10}
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
