import { Typography, Container } from "@material-ui/core";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

const FooterComponent = styled.footer`
  margin-top: auto;
  border-top: 1px solid #e0e0e0;
  background-color: #1b1b1b;
  padding: 20px;
  color: #d3af37;
`;

export default function Footer() {
  return (
    <FooterComponent>
      <Container maxWidth="sm">
        <Typography component={"span"} variant="body2" align="center">
          <FormattedMessage id="copyright" />{" "}
          <Link href="/" passHref>
            <FormattedMessage id="app.name" />
          </Link>
        </Typography>
      </Container>
    </FooterComponent>
  );
}
