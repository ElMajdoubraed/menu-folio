import { Button, Grid, Typography } from "@material-ui/core";
import Link from "next/link";
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
      <Grid className="main__typography" item xs={12} sm={6} md={6}>
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
          <Link href={"/admin/dashboard"}>ابدأ الان</Link>
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <img
          src="/images/home/home.png"
          style={{
            width: "100%",
            height: "100%",
          }}
          alt="MenuFolio"
        />
      </Grid>
    </Grid>
  );
};

export default Main;
