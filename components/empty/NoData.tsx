import { Typography } from "@material-ui/core";
import { Empty } from "antd";

const NoData = (props: any) => (
  <Empty
    description={
      <Typography
        style={{
          marginTop: "2rem",
          color: "#333D51",
          fontSize: "1rem",
        }}
      >
        {props.description || "لا توجد معطيات بعد"}
      </Typography>
    }
  />
);

export default NoData;
