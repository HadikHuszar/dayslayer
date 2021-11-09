import * as React from "react";

import useApi from "../auth/useApi";
import useAuth0 from "../auth/useAuth0";
// import FetchQuote from "./quotesFetcher";
import { CopyToClipboard } from "react-copy-to-clipboard";
import VerticalLinearStepper from "./stepper";

import styles from "./styles.tasks.scss";
import Typography from "@mui/material/Typography";

const Tasks = () => {
  const [tasks, setTasks] = React.useState([]);
  const { loading, apiClient } = useApi();
  const { isAuthenticated, user } = useAuth0();
  const [events, setEvents] = React.useState([]);
  const [mentors, setMentors] = React.useState([]);
  const [threads, setThreads] = React.useState([]);
  const [meditation, setMeditation] = React.useState([]);
  const [quotes, setQuote] = React.useState([]);
  const [quotation, setQuotation] = React.useState([]);
  const [author, setAuthor] = React.useState([]);

  const loadTasks = React.useCallback(
    async () => setTasks(await apiClient.getTasks()),
    [apiClient],
  );
  const addTask = (task) => apiClient.addTask(task).then(loadTasks);

  React.useEffect(() => {
    !loading && loadTasks();
  }, [loading, loadTasks]);

  const generateCopyableString = () => {
    return [...events, ...mentors, ...meditation, ...threads]
      .map((data) => data.copyableText)
      .filter((data) => data !== undefined)
      .join("\n");
  };

  const dynamicallyGenerateString = () => {
    const parsedEventStrings = events.map(
      (event) => `${event.date}: ${event.title}\n`,
    );
    //parsed mentors
    // parsed medidiation
    // threads

    // [...parsedEventStrings, ...parsedMentorStrings, ...parsedMeditationStrings, ...parsedThreadStrings]
    //   .filter((data) => data !== undefined)
    //   .join("\n");
  };

  // const api_url = "https://zenquotes.io/api/quotes/";

  // async function getapi(url) {
  //   const response = await fetch(url);
  //   var data = await response.json();
  //   console.log(data);
  // }

  // getapi(api_url);

  // const FetchQuote = () => {
  //   fetch("http://quotes.rest/qod.json?category=inspire")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // };

  return loading ? null : (
    <>
      <section className="workspace-container">
        <span className="workspace-title">
          {user.given_name} , this is your input ...
        </span>
        <span id="workspace-toolslist">
          <VerticalLinearStepper
            setEvents={setEvents}
            setMentors={setMentors}
            setThreads={setThreads}
            setMeditation={setMeditation}
            setQuote={setQuote}
            setQuotation={setQuotation}
            setAuthor={setAuthor}
          />
        </span>
      </section>
      <section className="tasks-container">
        <span className="tasks-container-title">This is your output...</span>

        <CopyToClipboard
          text={generateCopyableString()}
          onCopy={() => console.log("copied")}
        >
          <button>Copy to clipboard with button</button>
        </CopyToClipboard>
        <span className="tasks-container-toolslist">
          <CalendarList events={events} />
          <MentorList mentors={mentors} />
          <MeditationList meditation={meditation} />
          <ThreadsList threads={threads} />
          <QuoteList quotes={quotes} quotation={quotation} author={author} />
          <TaskList {...{ tasks }} />
          <AddTask {...{ addTask }} />
        </span>
      </section>
    </>
  );
};

const CalendarList = ({ events }) => (
  <ul>
    <span id="calendarlist-date">
      <span role="img" aria-label="sun emoji">
        ☀️ &nbsp;
      </span>
      Today's date is: {new Date().toLocaleDateString()}
    </span>
    {events.map(({ id, title, date, start, end, icon, link }) => (
      <li key={id}>
        <span id="calendarlist-icon">{icon}</span>
        <span id="calendarlist-times">
          {start} - {end}:&nbsp;&nbsp;
        </span>
        <span id="calendarlist-title">{title}</span>
        <a href={link} onClick={link} target="_blank">
          (Zoom)
        </a>
      </li>
    ))}
  </ul>
);

const MentorList = ({ mentors }) => (
  <ul>
    {mentors.map(({ id, title, date, start, end, icon }) => (
      <li key={id}>
        <span id="calendarlist-icon">{icon}</span>
        <span id="calendarlist-times">
          {start} - {end}:&nbsp;&nbsp;
        </span>
        <span id="calendarlist-title">{title}</span>
      </li>
    ))}
  </ul>
);

const ThreadsList = ({ threads }) => (
  <ul>
    {threads.map(({ id, title, icon }) => (
      <li key={id}>
        <span id="calendarlist-icon">{icon}</span>
        <span id="calendarlist-title">{title}</span>
      </li>
    ))}
  </ul>
);

const MeditationList = ({ meditation }) => (
  <ul>
    {meditation.map(({ id, title, icon, link }) => (
      <li key={id}>
        <span id="calendarlist-icon">{icon}</span>
        <span id="calendarlist-title">{title}</span>
        <a href={link} onClick={link} target="_blank">
          (YouTube)
        </a>
      </li>
    ))}
  </ul>
);

const QuoteList = ({ quotes }) => (
  <ul>
    {quotes.map(({ id, quotation, author }) => (
      <li key={id}>
        <span id="calendarlist-icon">{quotation}</span>
        <span id="calendarlist-title">{author}</span>
        {/* <a href={link} onClick={link} target="_blank">
          (YouTube)
        </a> */}
      </li>
    ))}
  </ul>
);

const TaskList = ({ tasks }) => (
  <ul className={styles.list}>
    {tasks.map(({ id, name }) => (
      <li key={id}>{name}</li>
    ))}
  </ul>
);

const AddTask = ({ addTask }) => {
  const [task, setTask] = React.useState("");

  const canAdd = task !== "";

  const onSubmit = (e) => {
    e.preventDefault();
    if (canAdd) {
      addTask(task);
      setTask("");
    }
  };

  return (
    <form {...{ onSubmit }}>
      <label>
        New Item:
        <input onChange={(e) => setTask(e.currentTarget.value)} value={task} />
      </label>
      <button disabled={!canAdd} className={styles.button}>
        Add
      </button>
    </form>
  );
};

export default Tasks;
