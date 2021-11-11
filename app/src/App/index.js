import * as React from "react";

import Moment from "react-moment";
import { Routes, Route } from "react-router-dom";

// import calendarJson from "../Calendar";
import backgroundVideo from "../assets/intro.mp4";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import Nav from "../Nav";
import Tasks from "../Tasks";
import Guide from "../Guide";
import useApi from "../auth/useApi";
import useAuth0 from "../auth/useAuth0";
import { Protected } from "../auth/widgets";
import { Login, Logout } from "../auth/widgets";

import "./styles.app.scss";

const App = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { loading, apiClient } = useApi();

  React.useEffect(() => {
    if (isAuthenticated && !loading) {
      apiClient.addOrUpdateUser(user);
    }
  }, [isAuthenticated, user, loading, apiClient]);

  if (!isAuthenticated) {
    return (
      <main className="unauth-container">
        <div className="login-btn">
          <Button variant="contained" size="large" endIcon={<LoginIcon />}>
            <Login />
          </Button>
        </div>
        <video autoPlay muted className="hero-video">
          <source src={backgroundVideo} type="video/mp4" />
          <track default kind="captions" srcLang="en" />
        </video>
      </main>
    );
  }

  return (
    <Routes>
      {/* <Route path="/" element={<Protected component={Guide} />} /> */}
      <Route path="/" element={<Protected component={Home} />} />
      <Route path="/dashboard" element={<Protected component={Tasks} />} />
      <Route path="/guide" element={<Protected component={Guide} />} />
    </Routes>
  );
};

const Home = () => {
  const { isAuthenticated, user, getAccessTokenSilently, getIdTokenClaims } =
    useAuth0();

  return (
    <>
      <span id="welcome">Hello, {user.given_name} !</span>
    </>
  );
};

export default App;
