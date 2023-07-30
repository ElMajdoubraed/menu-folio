import Head from "next/head";
import { PageLayout } from "@/layouts";
import { Grid, Avatar } from "@mui/material";
import { FileInput, TextInput } from "@/components/inputs";
import { blue } from "@mui/material/colors";
import { Button } from "@material-ui/core";
import { message } from "antd";
import { useEffect, useState } from "react";
import { Alert } from "@material-ui/lab";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "@/hooks/useUpload";
import axios from "axios";
import useAuth from "@/hooks/useAuth";

export default function UpdateItem() {
  const uploadUrl = process.env.NEXT_PUBLIC_S3_UPLOAD_URL;
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [item, setItem] = useState() as any;
  const [error, setError] = useState({
    message: "",
    exist: false,
  });

  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/item/${id}/get`)
      .then((res) => {
        setItem(res.data?.item);
        if (!res.data?.item) {
          setError({
            message: "لا يوجد عنصر بهذا الرقم",
            exist: true,
          });
        } else {
          setName(res.data?.item?.name);
          setDescription(res.data?.item?.description);
          setPrice(res.data?.item?.price);
          setImagePreview(uploadUrl + "/" + res.data?.item?.image);
        }
      })
      .catch((e) => {
        setError({
          message:
            "لا تستطيع تعديل هذا العنصر ربما لانك لم تقم بانشاء قائمة طعام بعد",
          exist: true,
        });
      });
  }, [id]);

  const checkValidation = () => {
    if (!name || !price) {
      setError({
        message: "يجب ادخال جميع الحقول",
        exist: true,
      });
      return false;
    }
    if (price <= 0) {
      setError({
        message: "يجب ادخال سعر صحيح",
        exist: true,
      });
      return false;
    }
    return true;
  };

  const imagePreviewHandler = (event: any) => {
    try {
      if (event.target.files && event.target.files[0]) {
        setImage(event.target.files[0]);
        setImagePreview(URL.createObjectURL(event.target.files[0]) as any);
      }
    } catch (e) {}
  };
  const UpdateItemHandler = async () => {
    if (!checkValidation()) return;
    message.loading("جاري اضافة العنصر");
    const menuId = typeof item.menu === "string" ? item.menu : item.menu?.id;
    axios
      .put(`/api/item/${id}?menu=${menuId}`, {
        name,
        description,
        price,
      })
      .then(async (res) => {
        if (image && imagePreview != item.image)
          await uploadFile(image, item.image);
        message.success("تم اضافة العنصر بنجاح");
        router.push(`/menu/${menuId}`);
      })
      .catch((e) => {
        console.error(e);
        message.error("حدث خطأ ما");
      });
  };
  return (
    <>
      <Head>
        <title>تعديل عنصر - MenuFolio</title>
        <meta name="description" content="تعديل عنصر  - MenuFolio" />
        <meta name="author" content="MenuFolio" />
        <meta
          name="keywords"
          content="MenuFolio, Update, Create, Menu, Item, Food, Restaurant, Cafe, تعديل, عنصر, طعام, جديدة"
        />
      </Head>
      <PageLayout title="title.item.update">
        {error.exist ? (
          <Alert
            style={{
              marginBottom: "2rem",
              width: "100%",
            }}
            severity="error"
          >
            {" "}
            {error.message}{" "}
          </Alert>
        ) : null}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextInput
              label="اسم العنصر"
              name="name"
              defaultValue={name}
              value={name}
              required
              onChange={(value: string) => setName(value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="وصف العنصر"
              name="description"
              multiline
              defaultValue={description}
              value={description}
              required
              onChange={setDescription}
            />{" "}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="السعر"
              defaultValue={price}
              value={price}
              name="price"
              type="number"
              onChange={(value: string) => setPrice(parseInt(value))}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FileInput
              label="صورة العنصر"
              name="Image"
              required
              onChange={imagePreviewHandler}
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
            md={12}
          >
            <Avatar
              className="image__preview"
              sx={{ bgcolor: blue[500], width: 200, height: 200 }}
              variant="rounded"
              src={imagePreview}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              onClick={UpdateItemHandler}
              variant="contained"
              color="primary"
            >
              تعديل عنصر
            </Button>
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
}
