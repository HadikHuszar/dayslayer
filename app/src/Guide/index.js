import * as React from "react";

import useApi from "../auth/useApi";
import useAuth0 from "../auth/useAuth0";
import Checkbox from "@mui/material/Checkbox";
import VerticalLinearStepper2 from "./stepper";

import styles from "./styles.guide.scss";
// import Typography from "@mui/material/Typography";

export const GuideType = {
  MORNING: "morning",
  CODE: "code",
  WRAPUP: "wrapup",
  SOFTSKILLS: "softskills",
  INTERVIEW: "interview",
};

const Guides = () => {
  const [tasks, setTasks] = React.useState([]);
  const { loading, apiClient } = useApi();
  const { isAuthenticated, user } = useAuth0();
  const [morningguide, setMorningGuide] = React.useState([]);
  const [codeguide, setCodeGuide] = React.useState([]);
  const [wrapupguide, setWrapUpGuide] = React.useState([]);
  const [softskills, setSoftSkillsGuide] = React.useState([]);
  const [interview, setInterviewGuide] = React.useState([]);
  const [currentGuide, setCurrentGuide] = React.useState();

  const loadTasks = React.useCallback(
    async () => setTasks(await apiClient.getTasks()),
    [apiClient],
  );
  const addTask = (task) => apiClient.addTask(task).then(loadTasks);

  const deleteTask = (id) => apiClient.deleteTask(id).then(loadTasks);

  React.useEffect(() => {
    !loading && loadTasks();
  }, [loading, loadTasks]);

  console.log("currentGuide", currentGuide);

  const renderCurrentGuide = () => {
    if (!currentGuide) {
      return null;
    }

    if (currentGuide === GuideType.MORNING) {
      return <MorningGuide morningguide={morningguide} />;
    } else if (currentGuide === GuideType.CODE) {
      return <CodeGuide codeguide={codeguide} />;
    } else if (currentGuide === GuideType.WRAPUP) {
      return <WrapUpGuide wrapupguide={wrapupguide} />;
    } else if (currentGuide === GuideType.SOFTSKILLS) {
      return <SoftSkillsGuide softskills={softskills} />;
    } else if (currentGuide === GuideType.INTERVIEW) {
      return <InterviewGuide interview={interview} />;
    }
  };

  return loading ? null : (
    <section className="generator-container">
      <div>
        <div className="workspace-title">
          {user.given_name} , here are your guides ...
        </div>
        <section className="workspace-container">
          <span id="workspace-toolslist">
            <VerticalLinearStepper2
              setMorningGuide={setMorningGuide}
              setCodeGuide={setCodeGuide}
              setWrapUpGuide={setWrapUpGuide}
              setSoftSkillsGuide={setSoftSkillsGuide}
              setInterviewGuide={setInterviewGuide}
              setCurrentGuide={setCurrentGuide}
            />
          </span>
        </section>
      </div>
      <div>
        <div className="tasks-container-title">
          This is the guide you selected...
        </div>
        <section className="tasks-container">
          <span className="tasks-container-toolslist">
            {renderCurrentGuide()}
            {/* <AddTask {...{ addTask }} /> */}
          </span>
        </section>
      </div>
    </section>
  );
};

const MorningGuide = ({ morningguide }) => (
  <ul>
    <span id="calendarlist-date">
      <span role="img" aria-label="sun emoji">
        ☀️ &nbsp;
      </span>
      MORNING GUIDE for{" "}
      <span>
        :&nbsp;&nbsp;
        {new Date().toLocaleDateString("en-US", "long")}
      </span>
    </span>
    {morningguide.map(({ id, title, start, end, icon, link }) => (
      <li key={id}>
        <span id="calendarlist-icon">{icon}</span>
        <span id="calendarlist-title">{title}</span>
      </li>
    ))}
    <p>
      <span>
        <span role="img" aria-label="sun emoji">
          🧘‍♂️ &nbsp;
        </span>
        Meditation Guide &nbsp;
        <a href={"https://youtu.be/SEfs5TJZ6Nk"} target="_blank">
          (full-screen link):
        </a>
        &nbsp;&nbsp;
      </span>

      <iframe
        iframe
        width="230"
        height="150"
        src="https://www.youtube.com/embed/SEfs5TJZ6Nk"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </p>
  </ul>
);

const CodeGuide = ({ codeguide }) => (
  <ul>
    {codeguide.map(({ id, title, date, start, end, icon }) => (
      <li key={id}>
        <span id="calendarlist-icon">{icon}</span>
        <span id="calendarlist-title">{title}</span>
      </li>
    ))}
    <p>
      <span>
        <span role="img" aria-label="sun emoji">
          🧘‍♂️ &nbsp;
        </span>
        Sharing Tracker &nbsp;
        <a
          href={
            "https://docs.google.com/spreadsheets/d/1K0X9jcksJpjX6SHI-wbiRuX3-wPNbIlDp0eQytP1dPY/edit#gid=0"
          }
          target="_blank"
        >
          (full-screen link):
        </a>
        &nbsp;&nbsp;
      </span>
    </p>
  </ul>
);

const WrapUpGuide = ({ wrapupguide }) => (
  <ul>
    <span id="calendarlist-date">
      <span role="img" aria-label="sun emoji">
        ☀️ &nbsp;
      </span>
      WRAP-UP GUIDE for
      <span>
        :&nbsp;&nbsp;
        {new Date().toLocaleDateString("en-US", "long")}
      </span>
    </span>
    {wrapupguide.map(({ id, title, icon }) => (
      <li key={id}>
        <span id="calendarlist-icon">{icon}</span>
        <span id="calendarlist-title">{title}</span>
      </li>
    ))}
  </ul>
);

const SoftSkillsGuide = ({ softskills }) => (
  <ul>
    {softskills.map(({ id, title, icon, link }) => (
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

const InterviewGuide = ({ interview }) => (
  <ul>
    {interview.map(({ id, title, icon }) => (
      <li key={id}>
        <span id="calendarlist-icon">{icon}</span>
        <span id="calendarlist-title">{title}</span>
      </li>
    ))}
    <p>
      <span>
        <span role="img" aria-label="sun emoji">
          🧘‍♂️ &nbsp;
        </span>
        Weekly Survey &nbsp;
        <a
          href={
            "https://docs.google.com/forms/d/e/1FAIpQLScd4uVRaUiPSRGHqvBSzFmFekrSW2BFeySquldEymWwbyIffw/viewform"
          }
          target="_blank"
        >
          (full-screen link):
        </a>
        &nbsp;&nbsp;
      </span>
    </p>
  </ul>
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

export default Guides;
