import { Grid, Paper, Typography } from "@material-ui/core";

const Why = () => {
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
          لماذا تستخدم أنا في إدارة مشاريعك
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
          خصائص متقدمة لبناء سير العمل الذي تريده
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

export default Why;
