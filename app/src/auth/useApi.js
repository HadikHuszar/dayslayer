import * as React from "react";

import useAuth0 from "./useAuth0";

const makeApi = (accessToken) => {
  const actions = {
    getTasks: () => _get("/api/tasks"),
    addTask: (name) => _post("/api/tasks", { name }),
    addOrUpdateUser: (user) => _post("/api/users", { user }),
    getTeam: () => _get("/api/team"),
    deleteTask: (id) => _delete(`api/tasks/${id}`),
  };

  const getTeam = async (user) => await _fetch(user).json();

  const _get = async (url) => (await _fetch(url)).json();

  const _delete = (url) => _fetch(url, { method: "DELETE" });

  const _post = async (url, body) => {
    const response = await _fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let result;
    try {
      result = await response.json();
    } catch {}
    return result;
  };

  const _fetch = (url, options) =>
    fetch(url, {
      ...options,
      headers: {
        ...(options?.headers ?? {}),
        Authorization: `Bearer ${accessToken}`,
      },
    });

  return actions;
};

const useApi = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [state, setState] = React.useState({
    loading: true,
    error: null,
    apiClient: undefined,
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        try {
          const accessToken = await getAccessTokenSilently();
          setState({
            loading: false,
            error: null,
            apiClient: makeApi(accessToken),
          });
        } catch (error) {
          setState({ loading: false, error, apiClient: undefined });
        }
      })();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return state;
};

export default useApi;
