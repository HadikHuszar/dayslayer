import { NavLink } from "react-router-dom";

import logo from "../assets/dayslayer_logo.png";
import useAuth0 from "../auth/useAuth0";
import { Login, Logout } from "../auth/widgets";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import styles from "./styles.nav.scss";
import { blueGrey } from "@mui/material/colors";

const navlinkClassname = ({ isActive }) => {
  console.log("styles:", styles);
  if (isActive) {
    // return styles["nav-link-selected"];
    return "nav-link-selected";
  } else {
    return "nav-link";
    // return styles["nav-link"];
  }
};

const Nav = () => (
  <nav className={styles.nav}>
    <NavLink to="/" end>
      <img src={logo} width="159" height="58" alt="DaySlayer Logo" />
    </NavLink>
    <span id="navitems">
      &nbsp;&nbsp; | &nbsp;&nbsp;
      <NavLink to="/dashboard" className={navlinkClassname}>
        <Button>Dashboard</Button>
      </NavLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <NavLink to="/guide" className={navlinkClassname}>
        <Button>Guide</Button>
      </NavLink>
    </span>
    <span id="loginid">
      <Auth />
    </span>
  </nav>
);

const Auth = () => {
  const { isAuthenticated, user } = useAuth0();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <>
      <span id="userpix">Hello, {user.given_name}</span>
      <Avatar
        src="/broken-image.jpg"
        sx={{
          bgcolor: "steelblue",
          width: 24,
          height: 24,
          ml: 10,
          mt: -2,
          mb: 1,
        }}
      />
      <span id="log-button">
        <Button variant="contained" size="small" endIcon={<LoginIcon />}>
          <Logout />
        </Button>
      </span>
    </>
  );
};

export default Nav;
