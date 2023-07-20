import { Box, Typography, Divider, Paper, Container } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { FormattedMessage } from "react-intl";

const useStyles: any = makeStyles((theme: any) => ({
  title: {
    padding: theme.spacing(2),
    marginBottom: "1rem",
  },
}));

export default function Page({ children, title }: any) {
  const classes: any = useStyles();
  return (
    <Container
      sx={{
        marginTop: "2rem",
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
        {title && (
          <>
            <Box className={classes.title}>
              <Typography component={"span"} variant="h5">
                <FormattedMessage id={title} defaultMessage={title} />
              </Typography>
            </Box>
            <Divider />
          </>
        )}
        {children}
      </Paper>
    </Container>
  );
}
