import React from "react";
import Logo from "../logo/logo";
import "./navigation.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (
    <div className="dad">
      <Logo />
      {isSignedIn ? (
        <nav className="navigation">
          <p
            onClick={() => onRouteChange("signIn")}
            className="f3 link dim white underline pa3 pointer"
          >
            Sign Out
          </p>
        </nav>
      ) : (
        <nav className="navigation">
          <p
            onClick={() => onRouteChange("signIn")}
            className="f3 link dim white underline pa3 pointer"
          >
            Sign In
          </p>
          <p
            onClick={() => onRouteChange("register")}
            className="f3 link dim white underline pa3 pointer"
          >
            Register
          </p>
        </nav>
      )}
    </div>
  );
};

export default Navigation;

/*<p
          onClick={() => onRouteChange("register")}
          className="f3 link dim white underline pa3 pointer"
        >
          Sign Out
        </p>*/
