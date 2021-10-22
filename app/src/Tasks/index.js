import * as React from "react";

import * as apiClient from "../apiClient";

import styles from "./styles.module.scss";

const Tasks = () => {
  const [tasks, setTasks] = React.useState([]);

  const loadTasks = async () => setTasks(await apiClient.getTasks());
  const addTask = (task) => apiClient.addTask(task).then(loadTasks);

  React.useEffect(() => {
    loadTasks();
  }, []);

  return (
    <section>
      <TaskList {...{ tasks }} />
      <AddTask {...{ addTask }} />
    </section>
  );
};

const TaskList = ({ tasks }) => (
  <ul className={styles.list}>
    {tasks.map(({ id, name, hasImage, imageUrl }) => (
      <li key={id}>
        {name}
        {hasImage ? <img src={imageUrl} alt={name} /> : null}
      </li>
    ))}
  </ul>
);

const AddTask = ({ addTask }) => {
  const [task, setTask] = React.useState("");

  const canAdd = task !== "";

  const onSubmit = (e) => {
    const form = e.currentTarget;

    e.preventDefault();
    if (canAdd) {
      addTask(new FormData(form));
      setTask("");
    }

    form.reset();
  };

  return (
    <form {...{ onSubmit }} className={styles.form}>
      <label>
        New task:
        <input
          name="name"
          onChange={(e) => setTask(e.currentTarget.value)}
          value={task}
        />
      </label>
      <label>
        Image:
        <input name="image" type="file" accept="image/*" />
      </label>
      <button disabled={!canAdd}>Add</button>
    </form>
  );
};

export default Tasks;
