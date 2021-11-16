import { NavLink } from "react-router-dom";

import logo from "../assets/dayslayer_logo.png";
import useAuth0 from "../auth/useAuth0";
import { Login, Logout } from "../auth/widgets";

import Button from "@mui/material/Button";
import styles from "./styles.nav.scss";

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
      Hello, {user.given_name}
      <span id="userpix">
        <img src={user.picture} height="29" alt="" />
      </span>
      <br></br>
      <span id="log-button">
        <Logout />
      </span>
    </>
  );
};

export default Nav;
