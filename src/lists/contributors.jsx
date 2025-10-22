import React from "react";

import { Event, Notifier } from "./notifier";
import "./lists.css";

export function Contributors(props) {
  const userName = props.username;

  const [events, setEvent] = React.useState([]);

  React.useEffect(() => {
    Notifier.addHandler(handleEvent);

    return () => {
      Notifier.removeHandler(handleEvent);
    };
  }, []);

  function handleEvent(event) {
    setEvent((prevEvents) => {
      let newEvents = [event, ...prevEvents];
      if (newEvents.length > 10) {
        newEvents = newEvents.slice(1, 10);
      }
      return newEvents;
    });
  }

  function createMessageArray() {
    const messageArray = [];
    for (const [i, event] of events.entries()) {
      let message = "unknown";
      if (event.type === Event.End) {
        message = ` added item #${event.value.item}`;
      }

      messageArray.push(
        <div key={i} className="event">
          <span className={"contributor-event"}>
            {event.from.split("@")[0]}
          </span>
          {message}
        </div>
      );
    }
    return messageArray;
  }

  return (
    <div className="contributors">
      <h1>Welcome *User*</h1>
      <h2>Your current list</h2>
      <span className="contributor-name">{userName}</span>
      <div id="contributor-messages">{createMessageArray()}</div>
      <form method="get" action="play.html">
        <div class="input-group mb-3">
          <span class="input-group-text">@</span>
          <input class="form-control" type="text" placeholder="Add an item" />
        </div>
        <button type="submit" class="btn btn-primary" id="add_button">
          Add
        </button>
        <button type="submit" class="btn btn-secondary" id="delete_button">
          Delete
        </button>
      </form>
    </div>
  );
}
