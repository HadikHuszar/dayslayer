import * as React from "react";

import useApi from "../auth/useApi";
import useAuth0 from "../auth/useAuth0";
import RecordVoiceOverRoundedIcon from "@mui/icons-material/RecordVoiceOverRounded";
import VerticalLinearStepper from "./stepper";

import styles from "./styles.tasks.scss";
import Typography from "@mui/material/Typography";

const Tasks = () => {
  const [tasks, setTasks] = React.useState([]);
  const { loading, apiClient } = useApi();
  const { isAuthenticated, user } = useAuth0();
  const [events, setEvents] = React.useState([]);

  const loadTasks = React.useCallback(
    async () => setTasks(await apiClient.getTasks()),
    [apiClient],
  );
  const addTask = (task) => apiClient.addTask(task).then(loadTasks);

  React.useEffect(() => {
    !loading && loadTasks();
  }, [loading, loadTasks]);

  return loading ? null : (
    <>
      <section className="workspace-container">
        <span className="workspace-title">Hello, {user.given_name} !</span>
        <span id="workspace-toolslist">
          <VerticalLinearStepper setEvents={setEvents} />
        </span>
      </section>

      <section className="tasks-container">
        <span className="output-title">This is your output...</span>
        <CalendarList events={events} />
        <TaskList {...{ tasks }} />
        <AddTask {...{ addTask }} />
      </section>
    </>
  );
};

const CalendarList = ({ events }) => (
  <ul>
    <span id="calendarlist-date">November 11, 2021</span>
    {events.map(({ id, title, date, start, end, icon }) => (
      <li key={id}>
        <span id="calendarlist-icon">{icon}</span>
        <span id="calendarlist-times">
          {start} - {end}:&nbsp;&nbsp;
        </span>
        <span id="calendarlist">{title}</span>
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
