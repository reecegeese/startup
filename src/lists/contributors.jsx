import React from "react";

import { Event, Notifier } from "./notifier";
import "./lists.css";
import Button from "react-bootstrap/Button";

export function Contributors(props) {
  const userName = props.userName;

  const [events, setEvent] = React.useState([]);

  React.useEffect(() => {
    Notifier.addHandler(handleEvent);
    return () => Notifier.removeHandler(handleEvent);
  }, []);

  function handleEvent(event) {
    setEvent([...events, event]);
  }

  function createMessageArray() {
    const messageArray = [];
    for (const [i, event] of events.entries()) {
      let message = "unknown";
      if (event.type === Event.End) {
        message = `scored ${event.value.score}`;
      } else if (event.type === Event.Start) {
        message = `created a new list`;
      } else if (event.type === Event.System) {
        message = event.value.msg;
      }

      messageArray.push(
        <div key={i} className="event">
          <span className={"player-event"}>{event.from.split("@")[0]}</span>
          {message}
        </div>
      );
    }
    return messageArray;
  }

  return (
    <div className="contributors">
      <h1>Welcome {userName}</h1>
      <h2>Your current list</h2>
      <div id="contributor-messages">{createMessageArray()}</div>
      <form onSubmit={handleAddClick}>
        <div className="input-group mb-3">
          <span className="input-group-text">@</span>
          <input
            className="form-control"
            type="text"
            value={textBox}
            s
            onChange={(e) => setText(e.target.value)}
            placeholder="Add an item"
          />
        </div>
        <Button
          type="submit"
          className="btn btn-primary"
          id="add_button"
          disabled={!textBox}
        >
          Add
        </Button>
        <Button
          className="btn btn-secondary"
          id="delete_button"
          onClick={handleDeleteClick}
          disabled={props.items.length === 0}
        >
          Delete
        </Button>
      </form>
    </div>
  );
}
