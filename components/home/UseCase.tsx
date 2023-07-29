import { Grid, Typography } from "@material-ui/core";

const UseCase = () => {
  return (
    <Grid
      id="usecase"
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
          أنشئ سير العمل الذي يناسبك{" "}
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
          خصص اللوحات والتطبيقات لتلائم أسلوب عملك
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        image
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        Description
      </Grid>
    </Grid>
  );
};

export default UseCase;
