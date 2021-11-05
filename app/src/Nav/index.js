import { NavLink } from "react-router-dom";

import logo from "../assets/dayslayer_logo.png";
import useAuth0 from "../auth/useAuth0";
import { Login, Logout } from "../auth/widgets";

import styles from "./styles.nav.scss";

const Nav = () => (
  <nav className={styles.nav}>
    <NavLink to="/" end>
      {/* Home */}
      <img src={logo} width="159" height="58" alt="DaySlayer Logo" />
    </NavLink>
    <span id="navitems">
      &nbsp;&nbsp; | &nbsp;&nbsp;<NavLink to="dashboard">Dashboard</NavLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <NavLink to="team">Team</NavLink>
      <NavLink to="steps">Steps</NavLink>
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
