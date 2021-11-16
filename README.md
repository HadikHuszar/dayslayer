# <img style="margin-left: -5px;" src="https://static.wixstatic.com/media/22d03e_faa72cd2e2da48a189937bb2af555ddf~mv2.png/v1/fill/w_159,h_58,al_c,q_85/22d03e_faa72cd2e2da48a189937bb2af555ddf~mv2.webp">

<br>**Leading a Team Made Simple.**

[View DaySlayer™ Live](https://dayslayer.herokuapp.com/dashboard)&nbsp;&nbsp;&nbsp;<sub>\*_(See testing profiles below in the "To Use" section to sign in with.)_</sub>

[View DaySlayer™ Website](https://www.dayslayer.today/)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub>\*_(Project information, including data schema, user-flow and wireframe.)_</sub>

#

**What is DaySlayer?**
DaySlayer™ is a team lead app designed to make leading a team simple. <br><br>It allows a user to:

- collect items from the **Team Calendar**
- collect items from the **Mentor Calendar**
- create **Pairing Groups**
- select the **Meditation Exercise** for the day
- create **Discussion Threads**
- autogenerate the **Inspirational Quote** for the day

which the user can then copy and paste into the user's preferred messaging mechanism.

It also provides the user with guides to lead the team meetings required for the day..
<br><br><br><br>

# **To Use**

### _On Heroku_

Since the app utilizes Single Sign On authentication, you can use your own Google email, if you wish. This would require an additional step for a first-time authorization from Google.

Alternatively, I have created a test account to avoid first-time authentication steps:

Username: **testingdayslayer**@gmail.com <br>
Password: **Leadthed@y**

#

### _Locally_

1. You will need to install and run [Docker](https://docs.docker.com/get-docker/).
2. Fork and clone this repo
3. Follow the first 15 minutes of [this video](https://www.youtube.com/watch?v=zrLf4KMs71E) to set up an API key and Client ID in order to use the Google API.
4. Create a `.env` file in the `app/` directory
5. Add two lines...

```
REACT_APP_API_KEY=<copy/paste your api key here>
REACT_APP_CLIENT_ID=<copy/paste your client id here>
```

6. In your CLI, from the root directory, run the command `npm run db:init` to set up the database
7. Also from your root directory, run the command `npm start`
8. DaySlayer™ will be running on `localhost:3000`

#

<br><br><br>

## **MVP**

Users should be able to...

- Log in with their Google account or Test User Account
- collect items from the **Team Calendar**
- collect items from the **Mentor Calendar**
- create **Pairing Groups**
- select the **Meditation Exercise** for the day
- create **Discussion Threads**
- autogenerate the **Inspirational Quote** for the day
- copy and paste the consolidated info into preferred messaging app
- utilize the guides for the various team lead functions

## **Nice-to-Haves**

1. Make the Step Function Non-Linear to allow a user to enter a multi-step flow at any point.
2. Management Panel to Control Automated Features.
3. Re-Factoring of Information for Mobile Layout.

#

## **Technologies**

- Technologies
- Postgresql Database
- Express
- React.js
- Node.js
- ES Lint
- JEST
- React Testing Libraries
- Docker
- Auth0 API
- Quotes REST API

#

## **Technical Risks**

- **One API is okay, but three might be too complicated to implement in time**

  > This indeed ended up becoming the case — with Auth0 using Google's SSO integration, the combination proved to be too complex when layering in the Goole Calendar API. Google calendar was working and then stopped working a week before launch. Six seasoned engineers stumped by the case _(which made me feel a bit better about it because there was no apparent reason for the break)_, and I now have an open ticket with Auth0 to investigate the cause.

  > In order to present a working prototype by project deadline, I had to create mock data in order demonstrate the core features of the app.

  > All of the structure is in place so that once the data starts flowing again from the calendar API, just a few lines of code change is required to make it work with all real data again.
  > <img src="app/images/mindful_bites_user_flow.png" width="500px"> > <BR>

#

## **App Screen Captures**

**Intro Screen**
<img src="app/images/IntroScreen.png" width="750px">
<br><br>
**Login Screen**
<img src="app/images/LoginScreen.png" width="750px">
