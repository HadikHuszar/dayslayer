import * as React from "react";

import useApi from "../auth/useApi";
import useAuth0 from "../auth/useAuth0";
import VerticalLinearStepper from "./stepper";

import styles from "./styles.tasks.scss";

// const dynamicallyGenerateString = () => {
//   const parsedEventStrings = events.map(
//     (event) => `${event.date}: ${event.title}\n`,
//   );
//   //parsed mentors
//   // parsed medidiation
//   // threads
//   // parsed quote

//   // [...parsedEventStrings, ...parsedMentorStrings, ...parsedMeditationStrings, ...parsedThreadStrings]
//   //   .filter((data) => data !== undefined)
//   //   .join("\n");
// };

export const generateCopyableString = (data) => {
  if (!data) {
    return "";
  }
  return data
    .map((data) => data.copyableText)
    .filter((data) => data !== undefined)
    .join("\n");
};

const Tasks = () => {
  const [tasks, setTasks] = React.useState([]);
  const { loading, apiClient } = useApi();
  const { isAuthenticated, user } = useAuth0();
  const [events, setEvents] = React.useState([]);
  const [mentors, setMentors] = React.useState([]);
  const [threads, setThreads] = React.useState([]);
  const [meditation, setMeditation] = React.useState([]);
  const [quote, setQuote] = React.useState({});
  const [pairs, setPairs] = React.useState([]);

  const loadTasks = React.useCallback(
    async () => setTasks(await apiClient.getTasks()),
    [apiClient],
  );

  React.useEffect(() => {
    !loading && loadTasks();
  }, [loading, loadTasks]);

  const generateCopyableString = () => {
    return [...events, ...mentors, ...meditation, ...threads, ...pairs, quote]
      .map((data) => data.copyableText)
      .filter((data) => data !== undefined)
      .join("\n");
  };

  //////////////////// USE LATER //////////////////////////

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
              setPairs={setPairs}
              generateCopyableString={generateCopyableString}
            />
          </span>
        </section>
      </div>
      <div>
        <div className="tasks-container-title">This is your output...</div>
        <section className="tasks-container">
          <span className="tasks-container-toolslist">
            <CalendarList events={events} />
            <MentorList mentors={mentors} />
            <PairsList pairs={pairs} />
            <ThreadsList threads={threads} />
            <MeditationList meditation={meditation} />
            <QuoteList quote={quote} />
            <TaskList {...{ tasks }} />
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
      Today's date is:&nbsp;&nbsp;
      {new Date().toLocaleDateString("en-US", "long")}
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

export const MentorList = ({ mentors }) => (
  <ul>
    {mentors &&
      mentors.map(({ id, title, date, start, end, icon }) => (
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
    <span id="quotation">&ldquo;{quotation}&rdquo;</span>
    <span id="author">&mdash;{author}</span>
  </span>
);

const PairsList = ({ pairs }) => (
  <ul>
    {pairs.map(({ id, title, icon }) => (
      <li key={id}>
        <span id="calendarlist-icon">{icon}</span>
        <span id="calendarlist-title">{title}</span>
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

export default Tasks;
