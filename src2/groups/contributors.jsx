import React from "react";

import { Event, Notifier } from "./notifier";
import "./groups.css";

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
        message = ` created list #${event.value.item}`;
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
      <h1>Your Lists</h1>
      <span className="contributor-name">{userName}</span>
      <div id="contributor-messages">{createMessageArray()}</div>
    </div>
  );
}
