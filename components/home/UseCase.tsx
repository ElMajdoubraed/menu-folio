import { Grid, Typography, Button } from "@material-ui/core";
import { Divider } from "antd";
import map from "lodash/map";
import Link from "next/link";
import React, { useEffect, useState } from "react";
interface UseCaseInterface {
  image: string;
  title: string;
  description: string;
  button: {
    title: string;
    link: string;
  };
}
const UseCase = () => {
  const [UseCases, setUseCases] = useState<UseCaseInterface[]>([]);
  const getUseCases = async () => {
    const _use = await import("./data/useCase.json");
    setUseCases(_use);
  };
  useEffect(() => {
    getUseCases();
  }, []);
  return (
    <Grid
      id="usecase"
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
          أنشئ قائمة الطعام الخاصة بك على الإنترنت
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
          خصص قائمة الطعام الخاصة بك واجعلها متاحة على الإنترنت للجميع
        </Typography>
      </Grid>
      {map(UseCases, (use: UseCaseInterface, index: number) => {
        return index % 2 === 0 ? (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={6} md={6}>
              <img className="use__img" src={use.image} alt={use.title} />
            </Grid>
            <Grid
              style={{
                marginTop: 50,
                display: "block",
                alignItems: "center",
                justifyContent: "center",
              }}
              item
              xs={12}
              sm={6}
              md={6}
            >
              <Typography className="use__img__text">{use.title}</Typography>
              <Typography className="use__img__text__description">
                {use.description}
              </Typography>
              <Button variant="outlined" color="secondary">
                <Link href={use.button?.link}>{use.button?.title}</Link>
              </Button>
            </Grid>
            <Divider />
          </React.Fragment>
        ) : (
          <React.Fragment key={index}>
            <Grid
              style={{
                marginTop: 50,
                display: "block",
                alignItems: "center",
                justifyContent: "center",
              }}
              item
              xs={12}
              sm={6}
              md={6}
            >
              <Typography className="use__img__text">{use.title}</Typography>
              <Typography className="use__img__text__description">
                {use.description}
              </Typography>
              <Button variant="outlined" color="secondary">
                <Link href={use.button.link}>{use.button.title}</Link>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <img className="use__img" src={use.image} alt={use.title} />
            </Grid>
            <Divider />
          </React.Fragment>
        );
      })}
    </Grid>
  );
};

export default UseCase;
