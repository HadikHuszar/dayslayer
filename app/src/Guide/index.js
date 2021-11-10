import * as React from "react";

import useApi from "../auth/useApi";
import useAuth0 from "../auth/useAuth0";
import { CopyToClipboard } from "react-copy-to-clipboard";
import VerticalLinearStepper from "./stepper";

import styles from "./styles.guide.scss";
// import Typography from "@mui/material/Typography";

const Tasks = () => {
  const [tasks, setTasks] = React.useState([]);
  const { loading, apiClient } = useApi();
  const { isAuthenticated, user } = useAuth0();
  const [events, setEvents] = React.useState([]);
  const [mentors, setMentors] = React.useState([]);
  const [threads, setThreads] = React.useState([]);
  const [meditation, setMeditation] = React.useState([]);
  const [quote, setQuote] = React.useState({});

  const loadTasks = React.useCallback(
    async () => setTasks(await apiClient.getTasks()),
    [apiClient],
  );
  const addTask = (task) => apiClient.addTask(task).then(loadTasks);

  const deleteTask = (id) => apiClient.deleteTask(id).then(loadTasks);

  React.useEffect(() => {
    !loading && loadTasks();
  }, [loading, loadTasks]);

  const generateCopyableString = () => {
    return [...events, ...mentors, ...meditation, ...threads, quote]
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
    // parsed quote

    // [...parsedEventStrings, ...parsedMentorStrings, ...parsedMeditationStrings, ...parsedThreadStrings]
    //   .filter((data) => data !== undefined)
    //   .join("\n");
  };

  return loading ? null : (
    <section className="generator-container">
      <div>
        <div className="workspace-title">
          {user.given_name} , this is your input ...
        </div>
        <section className="workspace-container">
          <span id="workspace-toolslist">
            <VerticalLinearStepper
              setEvents={setEvents}
              setMentors={setMentors}
              setThreads={setThreads}
              setMeditation={setMeditation}
              setQuote={setQuote}
              generateCopyableString={generateCopyableString}
            />
          </span>
        </section>
      </div>
      <div>
        <div className="tasks-container-title">This is your output...</div>
        <section className="tasks-container">
          <span id="copy">
            <CopyToClipboard
              text={generateCopyableString()}
              onCopy={() => console.log("copied")}
            >
              <button>Copy to Clipboard</button>
            </CopyToClipboard>
          </span>
          <span className="tasks-container-toolslist">
            <CalendarList events={events} />
            <MentorList mentors={mentors} />
            <MeditationList meditation={meditation} />
            <ThreadsList threads={threads} />
            <QuoteList quote={quote} />
            <TaskList {...{ tasks }} deleteTask={deleteTask} />
            <AddTask {...{ addTask }} />
          </span>
        </section>
      </div>
    </section>
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
        <a href={link} target="_blank">
          (YouTube)
        </a>
      </li>
    ))}
  </ul>
);

const QuoteList = ({ quote: { quotation, author } }) => (
  <span>
    <span id="calendarlist-icon">{quotation}</span>
    <span id="calendarlist-title">{author}</span>
  </span>
);

const TaskList = ({ tasks, deleteTask }) => (
  <ul className={styles.list}>
    {tasks.map(({ id, name }) => (
      <li key={id}>
        <span
          role="button"
          tabIndex="0"
          onKeyDown={() => deleteTask(id)}
          id="task_name"
          onClick={() => deleteTask(id)}
        >
          {name}
        </span>
      </li>
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
