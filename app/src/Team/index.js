import * as React from "react";

import useApi from "../auth/useApi";

import styles from "./styles.team.scss";

const Team = () => {
  const [user, setTeam] = React.useState([]);
  const { loading, apiClient } = useApi();

  const loadTeam = React.useCallback(
    async () => setTeam(await apiClient.getTeam()),
    [apiClient],
  );
  const addTeam = (user) => apiClient.addTeam(user).then(loadTeam);

  React.useEffect(() => {
    !loading && loadTeam();
  }, [loading, loadTeam]);

  return loading ? null : (
    <>
      <section className="workspace-container">
        <span className="workspace-title">This is your input...</span>
        <span id="workspace-toolslist">
          Here are your tools:
          <ol>
            <li>Team Calendar</li>
            <li>Mentor Calendar</li>
            <li>Quote Generator</li>
            <li>Daily Meditation Guide Generator</li>
            <li>Anything Else? Hmmm....</li>
          </ol>
        </span>
      </section>

      <section className="tasks-container">
        <span className="output-title">This is your Team...</span>
        <TeamList {...{ user }} />
        <AddTeam {...{ addTeam }} />
      </section>
    </>
  );
};

const TeamList = ({ user }) => (
  <ul className={styles.list}>
    {user.map(({ id, given_name }) => (
      <li key={id}>{given_name}</li>
    ))}
  </ul>
);

const AddTeam = ({ addTeam }) => {
  const [team_member, setTeam] = React.useState("");

  const canAdd = team_member !== "";

  const onSubmit = (e) => {
    e.preventDefault();
    if (canAdd) {
      addTeam(team_member);
      setTeam("");
    }
  };

  return (
    <form {...{ onSubmit }}>
      <label>
        New TeamMember:
        <input
          onChange={(e) => setTeam(e.currentTarget.value)}
          value={team_member}
        />
      </label>
      <button disabled={!canAdd} className={styles.button}>
        Add
      </button>
    </form>
  );
};

export default Team;
