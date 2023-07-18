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
    <Link href="/login" passHref>
      <Button color="inherit" variant="outlined">
        <FormattedMessage id={"header.login"} />
      </Button>
    </Link>
  );
}

function UserMenu(user: any) {
  const { logout } = useAuth({
    redirectTo: "/login" as any,
    redirectIfFound: false,
  });
  const router = useRouter();
  const [menu, setMenu] = useState(null);
  const [currentUser, setCurrentUser] = useState(user.user);
  const [profilePicture, setProfilePicture] = useState("");
  const handleMenu = (event: any) => setMenu(event.currentTarget);
  const handleClose = () => setMenu(null);

  useEffect(() => {
    const currentUser = user.user;
    const imageUrl = `${process.env.NEXT_PUBLIC_S3_UPLOAD_URL}/users/${currentUser.id}.png`;
    setProfilePicture(imageUrl);
    setCurrentUser(currentUser);
  }, [user]);

  const handleLogout = async () => {
    setMenu(null);
    await logout();
    router.reload();
  };

  return (
    <div className="left">
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar src={profilePicture}>{currentUser?.name?.charAt(0)}</Avatar>
      </IconButton>
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
        <Link href="/profile" passHref>
          <MenuItem>{currentUser?.name}</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>
          <FormattedMessage id="header.logout" />
        </MenuItem>
      </Menu>
    </div>
  );
}
