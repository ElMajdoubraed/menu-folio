{
  /*Get orders list and change status */
}
import Head from "next/head";
import { PageLayout } from "@/layouts";
import { useRouter } from "next/router";

export default function GetOrders() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Head>
        <title> مراجعة الطلب- MenuFolio</title>
        <meta name="description" content="مراجعة الطلب الوارد - MenuFolio" />
      </Head>
      <PageLayout title="title.review-orders">
        <div>GetOrders</div>
      </PageLayout>
    </>
  );
}
