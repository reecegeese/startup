import React from "react";

import { Event, Notifier } from "./notifier";
import "./groups.css";

export function Contributors(props) {
  const userName = props.userName;
  const [events, setEvents] = React.useState([]);

  return (
    <div className="contributors">
      <h1>{userName}'s lists</h1>
      <div id="contributor-messages">
        {events.length > 0 && (
          <p className="list-full-message text-warning">
            {userName} has 1 list
          </p>
        )}
      </div>
    </div>
  );
}
