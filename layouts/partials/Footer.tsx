import {
  makeStyles,
  Typography,
  Container,
  Link as MuiLink,
} from "@material-ui/core";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: "auto",
    borderTop: "1px solid #e0e0e0",
    backgroundColor: "#1b1b1b",
    padding: "20px",
    color: "#d3af37",
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography component={"span"} variant="body2" align="center">
          <FormattedMessage id="copyright" />{" "}
          <Link href="/" passHref>
            <FormattedMessage id="app.name" />
          </Link>
        </Typography>
      </Container>
    </footer>
  );
}
