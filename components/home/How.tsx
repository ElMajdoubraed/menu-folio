import { Paper, Typography } from "@material-ui/core";
import { Grid } from "@mui/material";
import map from "lodash/map";
import { useEffect, useState } from "react";
interface HowInterface {
  icon: string;
  title: string;
  description: string;
}
const HowComponent = () => {
  const [How, setHow] = useState<HowInterface[]>([]);
  const getHow = async () => {
    const _how = await import("./data/how.json");
    setHow(_how);
  };
  useEffect(() => {
    getHow();
  }, []);
  return (
    <Grid
      id="how"
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
        <Typography
          style={{
            marginBottom: 30,
          }}
          align="center"
          variant="h5"
          component="h5"
          gutterBottom
        >
          كيف يساعدك MenuFolio
        </Typography>
      </Grid>
      {map(How, (how: HowInterface, index: number) => {
        return (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <img
              className="center__img"
              src={how.icon}
              width={75}
              height={75}
              alt={how.title}
            />
            <Typography className="img__text">{how.title}</Typography>
            <Typography className="img__text__description">
              {how.description}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default HowComponent;
