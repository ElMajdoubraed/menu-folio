import { useEffect, useState } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Box, Container } from "@mui/material";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  title: {
    cursor: "pointer",
  },
}));

export default function Header() {
  const classes = useStyles();
  const { user, logout } = useAuth();
  return (
    <AppBar position="static" variant="outlined">
      <Container maxWidth="lg" component="main">
        <Toolbar>
          <Link href="/" passHref>
            <Typography
              align="left"
              component={"span"}
              variant="h6"
              className={classes.title}
            >
              <FormattedMessage id="app.name" />
            </Typography>
          </Link>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flexGrow: 1,
            }}
          >
            {user ? <UserMenu user={user} logout={logout} /> : <GuestMenu />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function GuestMenu() {
  return (
    <Link href="/admin/add" passHref>
      <Button id="menu__btn" color="inherit" variant="outlined">
        <FormattedMessage id={"header.add"} />
      </Button>
    </Link>
  );
}

function UserMenu(user: any) {
  const { logout } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const router = useRouter();
  const [menu, setMenu] = useState(null);
  const [currentUser, setCurrentUser] = useState(user.user);
  const handleMenu = (event: any) => setMenu(event.currentTarget);
  const handleClose = () => setMenu(null);

  useEffect(() => {
    const currentUser = user.user;
    setCurrentUser(currentUser);
  }, [user]);

  const handleLogout = async () => {
    setMenu(null);
    await logout();
    router.reload();
  };

  return (
    <div className="left">
      <button id="menu_btn" onClick={handleMenu}>
        <Avatar>{currentUser?.name?.charAt(0).toUpperCase()}</Avatar>
      </button>
      <Menu
        id="menu-appbar"
        anchorEl={menu}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
        open={Boolean(menu)}
        onClose={handleClose}
      >
        <Link href="/admin/profile" passHref>
          <MenuItem>{currentUser?.name}</MenuItem>
        </Link>
        <Link href="/admin/dashboard" passHref>
          <MenuItem style={{ color: "black" }}>
            <FormattedMessage id="header.dashboard" />
          </MenuItem>
        </Link>
        <Link href="/admin/add" passHref>
          <MenuItem style={{ color: "black" }}>
            <FormattedMessage id={"header.addItem"} />
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>
          <FormattedMessage id="header.logout" />
        </MenuItem>
      </Menu>
    </div>
  );
}
