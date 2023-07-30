import Head from "next/head";
import { PageLayout } from "@/layouts";
import { Grid, Avatar } from "@mui/material";
import { FileInput, TextInput } from "@/components/inputs";
import { blue } from "@mui/material/colors";
import { Button, Select, MenuItem } from "@material-ui/core";
import { message } from "antd";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useEffect, useState } from "react";
import { Alert } from "@material-ui/lab";
import map from "lodash/map";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "@/hooks/useUpload";
import axios from "axios";
import useAuth from "@/hooks/useAuth";

export default function AddItem() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [category, setCategory] = useState();
  const [listCategories, setListCategories] = useState([]) as any;
  const [error, setError] = useState({
    message: "",
    exist: false,
  });

  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/menu/${id}/categories`)
      .then((res) => {
        setListCategories(res.data?.categories);
        if (res.data?.categories?.length === 0) {
          setError({
            message: "لا يمكنك اضافة عنصر جديد لانك لم تقم بانشاء فئة طعام بعد",
            exist: true,
          });
        }
      })
      .catch((e) => {
        setError({
          message:
            "لا يمكنك اضافة عنصر جديد ربما لانك لم تقم بانشاء قائمة طعام بعد",
          exist: true,
        });
      });
  }, [id]);

  const checkValidation = () => {
    if (!name || !price || !image || !category) {
      setError({
        message: "يجب ادخال جميع الحقول",
        exist: true,
      });
      return false;
    }
    if (price < 0) {
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
  const AddItemHandler = async () => {
    const selectedCategory = listCategories.find(
      (item: any) => item.name === category
    );
    if (!checkValidation()) return;
    message.loading("جاري اضافة العنصر");
    const uuid = uuidv4();
    await uploadFile(image, `menu/${id}/items/${uuid}${".png"}`);
    axios
      .post("/api/item", {
        name,
        description,
        price,
        image: `menu/${id}/items/${uuid}${".png"}`,
        category: selectedCategory._id,
        menu: id,
      })
      .then((res) => {
        message.success("تم اضافة العنصر بنجاح");
        router.push(`/menu/${id}`);
      })
      .catch((e) => {
        message.error("حدث خطأ ما");
      });
  };
  return (
    <>
      <Head>
        <title>أضف عنصر جديد - MenuFolio</title>
        <meta name="description" content="أضف عنصر جديد - MenuFolio" />
        <meta name="author" content="MenuFolio" />
        <meta
          name="keywords"
          content="MenuFolio, Add, Create, Menu, Item, Food, Restaurant, Cafe, اضاقة, عنصر, طعام, جديدة"
        />
      </Head>
      <PageLayout title="title.item">
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
              required
              onChange={setName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="وصف العنصر"
              name="description"
              multiline
              required
              onChange={setDescription}
            />{" "}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="السعر"
              defaultValue={0}
              name="price"
              type="number"
              onChange={setPrice}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              fullWidth
              input={<OutlinedInput />}
              inputProps={{ "aria-label": "Without label" }}
              displayEmpty
              onChange={(event) => setCategory(event.target.value as any)}
              renderValue={(selected) => {
                if (!selected) {
                  return <em>فئة العنصر *</em>;
                }
                return selected.toString();
              }}
            >
              <MenuItem disabled value="">
                <em>فئة العنصر</em>
              </MenuItem>
              {map(listCategories, (category, index) => (
                <MenuItem key={index} id={category._id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={12}>
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
              sx={{ bgcolor: blue[500], width: 200, height: 200 }}
              variant="rounded"
              src={imagePreview}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              disabled={error.exist}
              onClick={AddItemHandler}
              variant="contained"
              color="primary"
            >
              اضافة عنصر
            </Button>
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
}
