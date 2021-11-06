import * as React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import Moment from "react-moment";
import { Routes, Route } from "react-router-dom";

// import calendarJson from "../Calendar";
import Nav from "../Nav";
import Tasks from "../Tasks";
import VerticalLinearStepper from "../Tasks/stepper";
import Team from "../Team";
import useApi from "../auth/useApi";
import useAuth0 from "../auth/useAuth0";
import { Protected } from "../auth/widgets";

import "./styles.app.scss";

const Events = () => {
  const { isAuthenticated, user } = useAuth0();
  const [events, setEvents] = React.useState([]);

  return events.length === 0 ? (
    <h1>No Events</h1>
  ) : (
    <ul>
      {events.map((event) => (
        <li key={event.id}>{event.summary}</li>
      ))}
    </ul>
  );
};

const App = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { loading, apiClient } = useApi();

  React.useEffect(() => {
    if (isAuthenticated && !loading) {
      apiClient.addOrUpdateUser(user);
    }
  }, [isAuthenticated, user, loading, apiClient]);

  // console.log(calendarJson);

  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Protected component={Tasks} />} />
          <Route path="/team" element={<Team />} />
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

      //     function listUpcomingEvents() {
      //       gapi.client.calendar.events
      //         .list({
      //           calendarId: "primary",
      //           timeMin: new Date().toISOString(),
      //           showDeleted: false,
      //           singleEvents: true,
      //           maxResults: 10,
      //           orderBy: "startTime",
      //         })
      //         .then(function (response) {
      //           var events = response.result.items;
      //         });
      //     }

      // return listUpcomingEvents();

      ///////////////////// events /////////////

      // const Events = () => {
      //   const [events, setEvents] = React.useState([]);

      //   return events.length === 0 ? (
      //     "nothing here"
      //   ) : (
      //     <ul>
      //       {events.map((event) => (
      //         <li key={event.id}>{event.summary}</li>
      //       ))}
      //     </ul>
      //   );
      // });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <h1>Please log in</h1>; /// put something else
  }

  return (
    <>
      <span id="welcome">
        {/* <h1>{process.env.REACT_APP_TITLE}</h1> */}
        {/* <p>{process.env.REACT_APP_SUBTITLE}&trade;</p> */}
        Hello, {user.given_name} !
      </span>
      {/* {isAuthenticated ? "<Tasks />" : null} */}
      {/* {isGcalAuthenticated ? <Events /> : <h1>is Not Gcal Authenticated</h1>} */}
      {/* {isGcalAuthenticated ? <execute /> : <h1>is Not Gcal Authenticated</h1>} */}
    </>
  );
};

// const Tasks = () => {
//   const { isAuthenticated } = useAuth0();

//   return <>{isAuthenticated ? <Tasks /> : null}</>;
// };

// const Dashboard = () => <h1>Dashboard</h1>;

export default App;

// const Events = () => {
//   const [events, setEvents] = React.useState([]);

//   React.useEffect(() => {
//     gcal
//       .listUpcomingEvents(10)
//       .then(({ result: { items } }) => setEvents(items));
//   }, []);

//   return events.length === 0 ? (
//     <h1>No Events</h1>
//   ) : (
//     <ul>
//       {events.map((event) => (
//         <li key={event.id}>{event.summary}</li>
//       ))}
//     </ul>
//   );
// };
