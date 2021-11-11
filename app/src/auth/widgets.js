import { withAuthenticationRequired } from "@auth0/auth0-react";
import Page from "../Page";

import useAuth0 from "./useAuth0";

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <span
      role="button"
      tabIndex="0"
      on
      onKeyDown={() => loginWithRedirect()}
      onClick={() => loginWithRedirect()}
    >
      Log in
    </span>
  );
};

export const Logout = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log out
    </button>
  );
};

export const Protected = ({ component, ...props }) => {
  const Component = withAuthenticationRequired(component);
  return (
    <Page>
      <Component {...props} />
    </Page>
  );
};
