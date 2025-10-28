import React from "react";

import { Event, Notifier } from "./notifier";
import "./groups.css";

export function GroupContributors(props) {
  const userName = props.userName;

  return (
    <div className="contributors">
      <h1>{userName}'s lists</h1>
      <div id="contributor-messages">
        {props.list.length > 0 && <p>{userName} has 1 list</p>}
      </div>
    </div>
  );
}
