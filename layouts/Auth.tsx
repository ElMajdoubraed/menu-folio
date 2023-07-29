import { makeStyles } from "@material-ui/styles";
import {
  Container,
  CssBaseline,
  Paper,
  Box,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import useAuth from "@/hooks/useAuth";

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function Auth({ children, width = "xs" }: any) {
  useAuth({
    redirectTo: "/",
    redirectIfFound: true,
  });
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container component="main">
        <CssBaseline />
        <Paper className={classes.paper}>
          {/* start: Content */}
          {children}
          {/* end: Content */}
          {/* start: Copyright */}
          <Box mt={5}>
            <Typography
              component={"span"}
              variant="body2"
              color="textSecondary"
              align="center"
            >
              <FormattedMessage id="copyright" />{" "}
              <MuiLink color="primary" href="/">
                <FormattedMessage id="app.name" />
              </MuiLink>
            </Typography>
          </Box>
          {/* end: Copyright */}
        </Paper>
      </Container>
    </div>
  );
}
