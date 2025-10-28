import React from "react";

import { Event, Notifier } from "./notifier";
import "./lists.css";
import Button from "react-bootstrap/Button";

export function Contributors(props) {
  const userName = props.userName;
  const [textBox, setText] = React.useState([]);

  React.useEffect(() => {
    Notifier.addHandler(handleEvent);
    return () => Notifier.removeHandler(handleEvent);
  }, []);

  function handleEvent(event) {
    setEvents((prevEvents) => {
      let newEvents = [event, ...prevEvents];
      if (newEvents.length > 10) {
        newEvents = newEvents.slice(1, 10);
      }
      return newEvents;
    });
  }

  function handleAddClick(e) {
    e.preventDefault();
    if (!textBox) return;
    const newEvent = {
      from: userName,
      type: Event.End,
      item: textBox,
    };
    props.onInit((prev) => [newEvent, ...prev]);
    setText(textBox);
  }

  function handleDeleteClick(e) {
    e.preventDefault();

    props.onInit((prevEvents) => {
      const updated = [...prevEvents];
      updated.shift();
      return updated;
    });
  }

  function createMessageArray() {
    return props.items.map((event, i) => {
      let message = "unknown";
      if (event.type === Event.End) {
        message = `${event.from} added ${event.item}`;
      }

      return (
        <div key={i} className="event">
          <span className="contributor-event"></span> {message}
        </div>
      );
    });
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
