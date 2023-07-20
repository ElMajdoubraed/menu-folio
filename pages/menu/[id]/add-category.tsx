import Head from "next/head";
import { PageLayout } from "@/layouts";
import { Grid } from "@mui/material";
import { TextInput } from "@/components/inputs";
import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { message } from "antd";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AddCategory() {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [hasError, setHasError] = useState(false);

  const AddCategoryHandler = () => {
    message.success("تم اضافة الفئة بنجاح");
  };
  return (
    <>
      <Head>
        <title>اضاقة فئة جديدة - MenuFolio</title>
        <meta name="description" content="اضاقة فئة جديدة - MenuFolio" />
        <meta name="author" content="MenuFolio" />
        <meta
          name="keywords"
          content="MenuFolio, Add, Create, Menu, Category, Food, Restaurant, Cafe, اضاقة, فئة, طعام, جديدة"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <PageLayout title="title.category">
        {hasError ? (
          <Alert severity="error">
            لا يمكنك اضافة فئة جديدة ربما لانك لم تقم بانشاء قائمة طعام بعد
          </Alert>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextInput
                label="اسم الفئة"
                name="name"
                required
                onChange={setTitle}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                label="وصف الفئة"
                name="description"
                multiline
                required
                onChange={setDescription}
              />{" "}
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                onClick={AddCategoryHandler}
                variant="contained"
                color="primary"
              >
                اضافة الفئة الجديدة
              </Button>
            </Grid>
          </Grid>
        )}
      </PageLayout>
    </>
  );
}
