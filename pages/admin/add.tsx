import Head from "next/head";
import { PageLayout } from "@/layouts";
import { Grid, Avatar } from "@mui/material";
import { FileInput, TextInput } from "@/components/inputs";
import { blue } from "@mui/material/colors";
import { Button } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { message } from "antd";
import { useState } from "react";
import axios from "axios";
import { uploadFile } from "@/hooks/useUpload";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";

export default function Add() {
  const router = useRouter();
  const [title, setTitle] = useState() as any;
  const [description, setDescription] = useState() as any;
  const [logo, setLogo] = useState() as any;
  const [logoPreview, setLogoPreview] = useState() as any;
  const [phone, setPhone] = useState() as any;
  const [address, setAddress] = useState() as any;

  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });

  const logoPreviewHandler = (event: any) => {
    try {
      if (event.target.files && event.target.files[0]) {
        setLogo(event.target.files[0]);
        setLogoPreview(URL.createObjectURL(event.target.files[0]) as any);
      }
    } catch (e) {}
  };

  const AddMenu = async (e: any) => {
    e.preventDefault();
    try {
      message.loading("جاري اضافة القائمة");
      const uuid = uuidv4();
      await uploadFile(logo, `menu/logo/${uuid}${".png"}`);
      await axios
        .post("/api/menu", {
          name: title,
          description,
          phone,
          address,
          logo: `menu/logo/${uuid}.png`,
        })
        .then((res) => {
          message.success("تم اضافة القائمة بنجاح");
          router.push(`/admin/dashboard`);
        })
        .catch((e) => {
          message.error("حدث خطأ اثناء اضافة القائمة");
        });
    } catch (e) {
      message.error("حدث خطأ اثناء اضافة القائمة");
    }
    e.target.reset();
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
        <form onSubmit={AddMenu}>
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
              <Button type="submit" variant="contained" color="primary">
                اضافة قائمة
              </Button>
            </Grid>
          </Grid>
        </form>
      </PageLayout>
    </>
  );
}
