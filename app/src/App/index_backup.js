import * as React from "react";

// import gcal from "react-google-calendar-api";
import { Routes, Route } from "react-router-dom";

import Nav from "../Nav";
import Tasks from "../Tasks";
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

  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Protected component={Tasks} />} />
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
  const [isGcalAuthenticated, setIsGcalAuthenticated] = React.useState(
    gcal.sign,
  );

  React.useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((initialAuth0AccessToken) => {
        console.log("initialAuth0AccessToken:  ", initialAuth0AccessToken);

        // make a call to Auth0 Management API to get full user data
        fetch(
          //   "https:/dev-pgwlvw0x.us.auth0.com/api/v2/users/google-oauth2|112604842037227885586",
          `https:/dev-pgwlvw0x.us.auth0.com/api/v2/users/${user}`,
          {
            headers: {
              Authorization: `Bearer ${initialAuth0AccessToken}`,
            },
          },
        )
          .then((data) => console.log("full user data:  ", data))
          .catch((err) => console.log(err));

        // extract the Google API access token from the identities array

        // use this next token to then make a fetch call below , to calendars.

        // fetch(
        //   "https://content.googleapis.com/calendar/v3/calendars/primary/events",
        //   {
        //     headers: {
        //       Authorization: `Bearer ${googleApiAccessToken}`,
        //     },
        //   },
        // )
        //   .then((data) => console.log(data))
        //   .catch((err) => console.log(err));
      });
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
      {isGcalAuthenticated ? <Events /> : <h1>is Not Gcal Authenticated</h1>}
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
