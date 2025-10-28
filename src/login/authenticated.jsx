import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import "./login.css";

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("userName");
    props.onLogout();
  }

  return (
    <div>
      <div className="playerName">{props.userName}</div>
      <Button
        variant="primary"
        id="login_button"
        onClick={() => navigate("/play")}
      >
        Create List
      </Button>
      <Button variant="secondary" id="create_button" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
