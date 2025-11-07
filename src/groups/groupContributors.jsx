import React from "react";

import { Event, Notifier } from "./notifier";
import "./groups.css";

export function GroupContributors(props) {
  const userName = props.userName;
  const [proof, setProof] = React.useState("Loading...");

  React.useEffect(() => {
    fetch("/api/groups")
      .then((response) => response.json())
      .then((data) => {
        setProof(data);
      })
      .catch();
  }, []);

  return (
    <div className="contributors">
      <h1>{userName}'s lists</h1>
      <div id="contributor-messages">
        {props.list.length > 0 && <p>{userName} has 1 list</p>}
      </div>
      <div className="container-fluid text-center w-50 quote-box">
        <p className="quote">"{proof}"</p>
      </div>
    </div>
  );
}
