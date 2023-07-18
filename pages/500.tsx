import { Button, Typography } from "@material-ui/core";
import { Container, Paper } from "@mui/material";

export default function Error() {
  return (
    <Container
      sx={{
        marginTop: "2rem",
        marginBottom: "2rem",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        display: "flex",
      }}
    >
      <Paper
        sx={{
          padding: "2rem",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <Typography className="mb-5" variant="h5">
          خطأ في الخادم الداخلي{" "}
        </Typography>
        <Typography variant="h1" className="mb-5" color="primary">
          500
        </Typography>
        <Typography className="mb-5">
          واجه الخادم حالة غير متوقعة منعته من تلبية الطلب{" "}
        </Typography>

        <Button variant="contained" color="primary" href="/">
          أكمل الى الصفحة الرئيسية
        </Button>
      </Paper>
    </Container>
  );
}
