import { Button, Grid, Paper, Typography } from "@material-ui/core";

const StartNow = () => {
  return (
    <Grid
      id="startnow"
      component={Paper}
      style={{
        background: "#333D51",
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
          marginBottom: 20,
        }}
        item
        xs={12}
        sm={12}
        md={12}
      >
        <Typography
          color="primary"
          align="center"
          variant="h5"
          component="h5"
          gutterBottom
        >
          مستعد لإنجاز أعمالك وتحقيق أهدافك؟
        </Typography>
      </Grid>
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 50,
        }}
        item
        xs={12}
        sm={12}
        md={12}
      >
        <Button color="primary" variant="contained">
          start now
        </Button>
      </Grid>
    </Grid>
  );
};

export default StartNow;
