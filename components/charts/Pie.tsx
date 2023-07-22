import dynamic from "next/dynamic";
const Pie: any = dynamic(
  () => import("@ant-design/charts").then(({ Pie }) => Pie),
  {
    ssr: false,
  }
);
const DemoPie = () => {
  const data = [
    {
      type: "واحد",
      value: 27,
    },
    {
      type: "اثنين",
      value: 25,
    },
    {
      type: "ثلاثاء",
      value: 18,
    },
    {
      type: "اربعاء",
      value: 15,
    },
    {
      type: "خميس",
      value: 10,
    },
    {
      type: "جمعة",
      value: 5,
    },
  ];
  const config = {
    appendPadding: 19,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      style: {
        fontSize: 14,
        margin: "4rem",
        textAlign: "center",
        direction: "rtl",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
};
export default DemoPie;
