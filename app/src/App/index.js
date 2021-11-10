import * as React from "react";

import Moment from "react-moment";
import { Routes, Route } from "react-router-dom";

// import calendarJson from "../Calendar";
import Nav from "../Nav";
import Tasks from "../Tasks";
import VerticalLinearStepper from "../Tasks/stepper";
import Guide from "../Team";
import useApi from "../auth/useApi";
import useAuth0 from "../auth/useAuth0";
import { Protected } from "../auth/widgets";

import "./styles.app.scss";

const App = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { loading, apiClient } = useApi();

  React.useEffect(() => {
    if (isAuthenticated && !loading) {
      apiClient.addOrUpdateUser(user);
    }
  }, [isAuthenticated, user, loading, apiClient]);

  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Protected component={Tasks} />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </main>
      <footer>
        <span id="biline">{process.env.REACT_APP_SUBTITLE}&trade;</span>
      </footer>
    </>
  );
};

const Home = () => {
  const { isAuthenticated, user, getAccessTokenSilently, getIdTokenClaims } =
    useAuth0();

  React.useEffect(() => {
    if (isAuthenticated) {
      console.log("user information", user);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <h1>Please log in</h1>; /// put something else
  }

  return (
    <>
      <span id="welcome">Hello, {user.given_name} !</span>
    </>
  );
};

// const Tasks = () => {
//   const { isAuthenticated } = useAuth0();

//   return <>{isAuthenticated ? <Tasks /> : null}</>;
// };

// const Dashboard = () => <h1>Dashboard</h1>;

export default App;
