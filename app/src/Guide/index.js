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

  console.log("currentGuide", currentGuide);

  const renderCurrentGuide = (isSelected) => {
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
            {/* <AddTask {...{ addTask }} /> */}
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
    let klassname = "calendarlist-title";
    if (isChecked) {
      klassname += " selected";
    }
    return klassname;
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
    <span id="calendarlist-date">
      <MenuBookIcon sx={{ mb: -1, mr: 2 }} style={{ fill: "royalblue" }} />
      MORNING STAND-UP GUIDE for{" "}
      <span>
        :&nbsp;&nbsp;
        {new Date().toLocaleDateString("en-US", "long")}
      </span>
    </span>
    {morningguide.map(({ id, title, start, end, icon, link }, index) => (
      <DayslayerCheckbox key={index} id={id} title={title} icon={icon} />
    ))}
    <p>
      <span>
        <SelfImprovementIcon
          style={{ fill: "royalblue" }}
          sx={{ mb: -0.5, mr: 1 }}
        />
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
    <span id="calendarlist-date">
      <MenuBookIcon sx={{ mb: -1, mr: 2 }} style={{ fill: "royalblue" }} />
      CODE CHALLENGE GUIDE for
      <span>
        :&nbsp;&nbsp;
        {new Date().toLocaleDateString("en-US", "long")}
      </span>
    </span>
    {codeguide.map(({ id, title, date, start, end, icon }, index) => (
      <DayslayerCheckbox key={index} id={id} title={title} icon={icon} />
    ))}
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
        &nbsp;&nbsp;
      </span>
    </p>
  </ul>
);

const WrapUpGuide = ({ wrapupguide }) => (
  <ul>
    <span id="calendarlist-date">
      <MenuBookIcon sx={{ mb: -1, mr: 2 }} style={{ fill: "royalblue" }} />
      DAILY WRAP-UP GUIDE for
      <span>
        :&nbsp;&nbsp;
        {new Date().toLocaleDateString("en-US", "long")}
      </span>
    </span>
    {wrapupguide.map(({ id, title, icon }, index) => (
      <DayslayerCheckbox key={index} id={id} title={title} icon={icon} />
    ))}
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
        &nbsp;&nbsp;
      </span>
    </p>
  </ul>
);

const SoftSkillsGuide = ({ softskills }) => (
  <ul>
    <span id="calendarlist-date">
      <MenuBookIcon sx={{ mb: -1, mr: 2 }} style={{ fill: "royalblue" }} />
      SOFT SKILL DAY DISCUSSION GUIDE for
      <span>
        :&nbsp;&nbsp;
        {new Date().toLocaleDateString("en-US", "long")}
      </span>
    </span>
    {softskills.map(({ id, title, icon, link }, index) => (
      <DayslayerCheckbox key={index} id={id} title={title} icon={icon} />
    ))}
  </ul>
);

const InterviewGuide = ({ interview }) => (
  <ul>
    <span id="calendarlist-date">
      <MenuBookIcon sx={{ mb: -1, mr: 2 }} style={{ fill: "royalblue" }} />
      INTERVIEW GUIDE for
      <span>
        :&nbsp;&nbsp;
        {new Date().toLocaleDateString("en-US", "long")}
      </span>
    </span>
    {interview.map(({ id, title, icon }, index) => (
      <DayslayerCheckbox key={index} id={id} title={title} icon={icon} />
    ))}
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
