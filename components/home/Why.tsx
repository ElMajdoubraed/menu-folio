import { Grid, Paper, Typography } from "@material-ui/core";
import { map } from "lodash";
import { useState, useEffect } from "react";
interface WhyInterface {
  icon: string;
  title: string;
  description: string;
}
const WhyComponent = () => {
  const [Why, setWhy] = useState<WhyInterface[]>([]);
  const getWhy = async () => {
    const _why = await import("./data/why.json");
    setWhy(_why);
  };
  useEffect(() => {
    getWhy();
  }, []);
  return (
    <Grid
      id="why"
      component={Paper}
      style={{
        padding: 20,
        marginTop: 50,
        marginBottom: 50,
      }}
      container
      spacing={2}
    >
      <Grid
        style={{
          marginTop: 50,
          marginBottom: 50,
        }}
        item
        xs={12}
        sm={12}
        md={12}
      >
        <Typography align="center" variant="h5" component="h5" gutterBottom>
          لماذا تستخدم MenuFolio ؟
        </Typography>
        <Typography
          align="center"
          style={{
            marginBottom: 30,
            marginTop: 30,
            fontSize: 14,
            color: "#666",
          }}
        >
          MenuFolio هي أفضل طريقة لإنشاء قائمة خاصة بك على الإنترنت.
        </Typography>
      </Grid>
      {map(Why, (why: WhyInterface, index: number) => {
        return (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <img
              className="center__img"
              src={why.icon}
              width={75}
              height={75}
              alt={why.title}
            />
            <Typography className="img__text">{why.title}</Typography>
            <Typography className="img__text__description">
              {why.description}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default WhyComponent;
