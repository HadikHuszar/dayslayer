import express from "express";
import axios from "axios";
import * as db from "./db.mjs";

const router = express.Router();
router.use(express.json());

router.get("/", async (request, response) => {
  axios
    .post("https://dev-pgwlvw0x.us.auth0.com/oauth/token", {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: "https://dev-pgwlvw0x.us.auth0.com/api/v2/",
      grant_type: "client_credentials",
    })
    .then((res) => {
      const initialAuth0AccessToken = res.data.access_token;
      // console.log("initialAuth0AccessToken", `Bearer ${initialAuth0AccessToken}`);

      axios
        .get(
          "https://dev-pgwlvw0x.us.auth0.com/api/v2/users/google-oauth2|112604842037227885586",
          {
            headers: {
              authorization: `Bearer ${initialAuth0AccessToken}`,
            },
          },
        )
        .then((secondRes) => {
          console.log("res", secondRes.data);
          const googleAccessToken = secondRes.data.identities[0].access_token;

          axios
            .get(
              `https://www.googleapis.com/calendar/v3/calendars/c_j5d3c22o6nod523b02gatphkos%40group.calendar.google.com/events?timeMax=2021-11-14T00%3A00%3A00.00Z&timeMin=2021-11-04T00%3A00%3A00.00Z&prettyPrint=true&key=${process.env.GOOGLE_API_KEY}`,
              {
                headers: {
                  authorization: `Bearer ${googleAccessToken}`,
                  accept: "application/json",
                },
              },
            )
            .then((calendarResponse) => {
              console.log("res", calendarResponse.data);
              response.json({ message: "ok", data: calendarResponse.data });
            })
            .catch((err) => response.json({ err }));
        })
        .catch((err) => response.json({ err }));
    });
});

export default router;
