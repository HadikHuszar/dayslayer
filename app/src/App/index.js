import * as React from "react";

import { Routes, Route } from "react-router-dom";

import backgroundVideo from "../assets/intro.mp4";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import Tasks from "../Tasks";
import Guide from "../Guide";
import useApi from "../auth/useApi";
import useAuth0 from "../auth/useAuth0";
import { Protected, Login } from "../auth/widgets";

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
      <span id="welcome">Hello {user.given_name} ,</span>
      <span id="intro">
        <p>
          You have <b>no messages</b> from your project SEAM today.
        </p>
        <p>
          Thank you for leading the team. This tool should help you to focus on
          empowering your group.<br></br>
          <br></br>
          Use the <b>Dashboard</b> to create your schedule and message that you
          send to your team. <br></br>
          <br></br>Use the <b>Guide</b> to walk you through leading the
          discussions.
        </p>
      </span>
      <span id="goodbye">
        Here's to a day filled with courage, clarity and compassion !
      </span>
    </>
  );
};

export default App;
