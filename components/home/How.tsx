import { Grid, Paper, Typography } from "@material-ui/core";

const How = () => {
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
        <Typography align="center" variant="h5" component="h5" gutterBottom>
          كيف يساعدك أنا على تنظيم عملك وزيادة إنتاجيتك
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        image
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        image
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        image
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        image
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        image
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        image
      </Grid>
    </Grid>
  );
};

export default How;
