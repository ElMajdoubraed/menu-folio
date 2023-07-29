import { Button, Grid, Typography } from "@material-ui/core";
const Main = () => {
  return (
    <Grid
      id="main"
      style={{
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
        sm={6}
        md={6}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          مرحبا بك في MenuFolio
        </Typography>
        <Typography
          style={{
            marginBottom: 30,
            marginTop: 30,
            fontSize: 14,
            color: "#666",
          }}
        >
          MenuFolio هي أفضل طريقة لإنشاء قائمة خاصة بك على الإنترنت.
        </Typography>
        <Button variant="contained" color="primary">
          ابدأ الان
        </Button>
      </Grid>
      <Grid
        style={{
          marginTop: 50,
          marginBottom: 50,
        }}
        item
        xs={12}
        sm={6}
        md={6}
      >
        image
      </Grid>
    </Grid>
  );
};

export default Main;
