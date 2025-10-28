import React from "react";

import { Event, Notifier } from "./notifier";
import "./lists.css";
import Button from "react-bootstrap/Button";

export function Contributors(props) {
  const userName = props.userName;
  const [item, newItem] = React.useState("");
  const [events, setEvents] = React.useState([]);

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
    if (!item) return;

    const newEvent = {
      from: userName,
      type: Event.End,
      item,
    };

    setEvents((prev) => [newEvent, ...prev]);
    setItem("");
  }

  function createMessageArray() {
    return events.map((event, i) => {
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
        <div class="input-group mb-3">
          <span class="input-group-text">@</span>
          <input
            class="form-control"
            type="text"
            value={item}
            onChange={(e) => newItem(e.target.value)}
            placeholder="Add an item"
          />
        </div>
        <Button
          type="submit"
          class="btn btn-primary"
          id="add_button"
          disabled={!item}
        >
          Add
        </Button>
        <Button class="btn btn-secondary" id="delete_button" disabled>
          Delete
        </Button>
      </form>
    </div>
  );
}
