{
  /*
lena bch todhher l menus kol ili zayedhom l admin maahom button delete

l edit bch tkon kn fil plat
*/
}

import Head from "next/head";
import { PageLayout } from "@/layouts";
import { useState } from "react";
import { map } from "lodash";

export default function Dashboard() {
  const [menus, setMenus] = useState(["menu1", "menu2", "menu3"]);
  return (
    <>
      <Head>
        <title>لوحة التحكم - MenuFolio</title>
        <meta
          name="description"
          content="قم بإنشاء قائمة الطعام الخاصة بك على الإنترنت."
        />
      </Head>
      <PageLayout title="title.dashboard">
        {map(menus, (menu) => {
          return (
            <div>
              <h1>{menu}</h1>
              <button>Delete</button>
            </div>
          );
        })}
      </PageLayout>
    </>
  );
}
