import Head from "next/head";
import { PageLayout } from "@/layouts";
import { Grid } from "@mui/material";
import { TextInput } from "@/components/inputs";
import { Button } from "@material-ui/core";
import { message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";

export default function Add() {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState() as any;
  const [description, setDescription] = useState() as any;
  const [phone, setPhone] = useState() as any;
  const [address, setAddress] = useState() as any;

  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });

  useEffect(() => {
    if (!id) return;
    axios.get("/api/menu/" + id).then((res) => {
      if (!res.data?.menu) return router.push("/admin/dashboard");
      setTitle(res.data?.menu.name);
      setDescription(res.data?.menu.description);
      setPhone(res.data?.menu.phone);
      setAddress(res.data?.menu.address);
    });
  }, [id, router]);

  const UpdateMenu = async (e: any) => {
    e.preventDefault();
    try {
      message.loading("جاري اضافة القائمة");
      await axios.put("/api/menu/" + id, {
        name: title,
        description: description,
        phone: phone,
        address: address,
      });
      message.success("تم تعديل القائمة بنجاح");
    } catch (e) {
      message.error("حدث خطأ اثناء اضافة القائمة");
    }
    e.target.reset();
  };
  return (
    <>
      <Head>
        <title>تعديل القائمة - MenuFolio</title>
        <meta name="description" content="تعديل القائمة - MenuFolio" />
        <meta name="author" content="MenuFolio" />
        <meta
          name="keywords"
          content="MenuFolio, Add, Create, Menu, Food, Restaurant, Cafe, اضاقة, قائمة, طعام, جديدة"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <PageLayout title="title.update">
        <form onSubmit={UpdateMenu}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextInput
                label="اسم القائمة"
                name="name"
                required
                focused
                value={title}
                onChange={setTitle}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                label="وصف القائمة"
                name="description"
                multiline
                focused
                required
                value={description}
                onChange={setDescription}
              />{" "}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                label="رقم الهاتف"
                name="phonne"
                type="tel"
                focused
                value={phone}
                onChange={setPhone}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                label="العنوان"
                value={address}
                focused
                name="address"
                onChange={setAddress}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button type="submit" variant="contained" color="primary">
                تعديل القائمة
              </Button>
            </Grid>
          </Grid>
        </form>
      </PageLayout>
    </>
  );
}
