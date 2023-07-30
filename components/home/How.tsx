import { Paper, Typography } from "@material-ui/core";
import { Grid } from "@mui/material";
import { map } from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
interface HowInterface {
  icon: string;
  title: string;
  description: string;
}
const How = () => {
  const [How, setHow] = useState<HowInterface[]>([]);
  const getHow = async () => {
    const _faqs = await import("./data/how.json");
    setHow(_faqs);
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
      spacing={4}
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
          كيف يساعدك MenuFolio
        </Typography>
      </Grid>
      {map(How, (how: HowInterface, index: number) => {
        return (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Image
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

export default How;
