import React from "react";

import { Event, Notifier } from "./notifier";
import "./login.css";

export function EmailCollector(props) {
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
    <main className="container-fluid text-center pt-5 pb-5">
      <div className="justify-content-center">
        <h1>Start making lists</h1>
        <span className="contributor-name">{userName}</span>
        <div id="contributor-messages">{createMessageArray()}</div>
        <form method="get" action="play.html">
          <div className="input-group mb-3">
            <span className="input-group-text">@</span>
            <input
              className="form-control"
              type="text"
              placeholder="your@email.com"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">🔒</span>
            <input
              className="form-control"
              type="password"
              placeholder="password"
            />
          </div>
          <button type="submit" className="btn btn-primary" id="login_button">
            Login
          </button>
          <button
            type="submit"
            className="btn btn-secondary"
            id="create_button"
          >
            Create
          </button>
        </form>
      </div>
    </main>
  );
}
