import Head from "next/head";
import { PageLayout } from "@/layouts";
import { Grid, Avatar } from "@mui/material";
import { FileInput, TextInput } from "@/components/inputs";
import { blue } from "@mui/material/colors";
import { Button } from "@material-ui/core";
import { message } from "antd";
import { useState } from "react";

export default function Add() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [logo, setLogo] = useState();
  const [logoPreview, setLogoPreview] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();

  const logoPreviewHandler = (event: any) => {
    try {
      if (event.target.files && event.target.files[0]) {
        setLogo(event.target.files[0]);
        setLogoPreview(URL.createObjectURL(event.target.files[0]) as any);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const AddMenu = () => {
    message.success("تم اضافة القائمة بنجاح");
  };
  return (
    <>
      <Head>
        <title>اضاقة قائمة جديدة - MenuFolio</title>
        <meta name="description" content="اضاقة قائمة طعام جديدة - MenuFolio" />
        <meta name="author" content="MenuFolio" />
        <meta
          name="keywords"
          content="MenuFolio, Add, Create, Menu, Food, Restaurant, Cafe, اضاقة, قائمة, طعام, جديدة"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <PageLayout title="title.create">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextInput
              label="اسم القائمة"
              name="name"
              required
              onChange={setTitle}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="وصف القائمة"
              name="description"
              multiline
              required
              onChange={setDescription}
            />{" "}
          </Grid>
          <Grid item xs={12} md={6}>
            <FileInput
              label="شعار القائمة"
              name="logo"
              required
              onChange={logoPreviewHandler}
            />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            item
            xs={12}
            md={6}
          >
            <Avatar
              sx={{ bgcolor: blue[500] }}
              variant="rounded"
              src={logoPreview}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="رقم الهاتف"
              name="phonne"
              type="tel"
              onChange={setPhone}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput label="العنوان" name="address" onChange={setAddress} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button onClick={AddMenu} variant="contained" color="primary">
              اضافة قائمة
            </Button>
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
}
