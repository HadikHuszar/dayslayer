import * as React from "react";

import useApi from "../auth/useApi";

import VerticalLinearStepper from "./stepper";

import styles from "./styles.tasks.scss";

const Tasks = () => {
  const [tasks, setTasks] = React.useState([]);
  const { loading, apiClient } = useApi();

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
        <span className="workspace-title">This is your input...</span>
        <span id="workspace-toolslist">
          Here are your tools:
          <VerticalLinearStepper />
        </span>
      </section>

      <section className="tasks-container">
        <span className="output-title">This is your output...</span>
        <TaskList {...{ tasks }} />
        <AddTask {...{ addTask }} />
      </section>
    </>
  );
};

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
