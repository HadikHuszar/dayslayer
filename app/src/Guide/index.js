import * as React from "react";

import useApi from "../auth/useApi";
import useAuth0 from "../auth/useAuth0";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import VerticalLinearStepper2 from "./stepper";

import Checkbox from "@mui/material/Checkbox";
import styles from "./styles.guide.scss";

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
  const [isSelected, setIsSelected] = React.useState();

  const loadTasks = React.useCallback(
    async () => setTasks(await apiClient.getTasks()),
    [apiClient],
  );
  const addTask = (task) => apiClient.addTask(task).then(loadTasks);

  const deleteTask = (id) => apiClient.deleteTask(id).then(loadTasks);

  React.useEffect(() => {
    !loading && loadTasks();
  }, [loading, loadTasks]);

  const renderCurrentGuide = (isSelected) => {
    switch (currentGuide){
      case GuideType.MORNING:
          return <MorningGuide morningguide={morningguide} />;
      case GuideType.CODE:
          return <CodeGuide codeguide={codeguide} />;
      case GuideType.WRAPUP:
          return <WrapUpGuide wrapupguide={wrapupguide} />;
      case GuideType.SOFTSKILLS:
          return <SoftSkillsGuide softskills={softskills} />;
      case GuideType.INTERVIEW:
          return <InterviewGuide interview={interview} />;
      default:
          return null
    }
  };

  return loading ? null : (
    <section className="generator-container">
      <div>
        <div id="workspace-title">
          {user.given_name} , here are your guides ...
        </div>
        <section id="workspace-container">
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
        <div id="tasks-container-title">This is the guide you selected...</div>
        <section id="tasks-container">
          <span id="tasks-container-toolslist">
            {renderCurrentGuide()}
          </span>
        </section>
      </div>
    </section>
  );
};

const DayslayerCheckbox = ({ id, title, icon }) => {
  const [isChecked, setIsChecked] = React.useState(false);

  const onCheck = React.useCallback(() => {
    setIsChecked(!isChecked);
  }, [isChecked]);

  const selectedClassName = React.useMemo(() => {
    let className = "calendarlist-title";
    if (isChecked) {
      className += " selected";
    }
    return className;
  }, [isChecked]);

  return (
    <li key={id}>
      <span id="calendarlist-icon">{icon}</span>
      <Checkbox onChange={onCheck}> </Checkbox>
      <span className={selectedClassName}>{title}</span>
    </li>
  );
};

const MorningGuide = ({ morningguide }) => (
  <ul>
    <GuideHeader label={"MORNING STAND-UP GUIDE for"} checkboxItems={morningguide} />
    <p>
      <span>
        <SelfImprovementIcon
          style={{ fill: "royalblue" }}
          sx={{ mb: -0.5, mr: 1 }}
        />
        Meditation Guide
        <a href={"https://youtu.be/SEfs5TJZ6Nk"} target="_blank">
          (full-screen link):
        </a>
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
    <GuideHeader label={"CODE CHALLENGE GUIDE for"} checkboxItems={codeguide} />
    <p>
      <span>
        <FolderSharedIcon
          sx={{ mb: -0.5, mr: 1 }}
          style={{ fill: "royalblue" }}
        />
        <a
          href={
            "https://docs.google.com/spreadsheets/d/1K0X9jcksJpjX6SHI-wbiRuX3-wPNbIlDp0eQytP1dPY/edit#gid=0"
          }
          target="_blank"
        >
          Group Sharing Tracker
        </a>
      </span>
    </p>
  </ul>
);

const WrapUpGuide = ({ wrapupguide }) => (
  <ul>
    <GuideHeader label={"DAILY WRAP-UP GUIDE for"} checkboxItems={wrapupguide} />
    <p>
      <span>
        <DescriptionIcon
          sx={{ mb: -0.5, mr: 1 }}
          style={{ fill: "royalblue" }}
        />
        <a
          href={
            "https://docs.google.com/spreadsheets/d/13zwG6TTaClYG1VLe9xkJAUAsN_yrK7XCdmHQgkUL0Po/edit#gid=0"
          }
          target="_blank"
        >
          Retro Form
        </a>
      </span>
    </p>
  </ul>
);

const SoftSkillsGuide = ({ softskills }) => (
  <ul>
    <GuideHeader label={"SOFT SKILL DAY DISCUSSION GUIDE for"} checkboxItems={softskills} />
  </ul>
);

const InterviewGuide = ({ interview }) => (
  <ul>
    <GuideHeader label={"INTERVIEW GUIDE for"} checkboxItems={interview} />
    <p>
      <span>
        <AssessmentIcon
          sx={{ mb: -0.5, mr: 1 }}
          style={{ fill: "royalblue" }}
        />
        <a
          href={
            "https://docs.google.com/forms/d/e/1FAIpQLScd4uVRaUiPSRGHqvBSzFmFekrSW2BFeySquldEymWwbyIffw/viewform"
          }
          target="_blank"
        >
          Weekly Survey
        </a>
      </span>
    </p>
  </ul>
);

const GuideHeader = ({ label, checkboxItems  }) => {
    return (
      <>
         <span id="calendarlist-date">
          <MenuBookIcon sx={{ mb: -1, mr: 2 }} style={{ fill: "royalblue" }} />
          {label}
          <span>
            {new Date().toLocaleDateString("en-US", "long")}
          </span>
        </span>
        {checkboxItems.map(({ id, title, icon }, index) => (
          <DayslayerCheckbox key={index} id={id} title={title} icon={icon} />
        ))}
      </>
    )
}

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
    <form onSubmit={onSubmit}>
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
