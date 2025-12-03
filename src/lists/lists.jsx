import React from "react";
import { Event, Notifier } from "./notifier";
import "./lists.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export function Lists(props) {
  const userName = props.userName;
  const [textBox, setText] = React.useState([]);
  const [events, setEvent] = React.useState([]);
  const items = props.list;
  const navigate = useNavigate();

  React.useEffect(() => {
    Notifier.addHandler(handleEvent);

    return () => {
      Notifier.removeHandler(handleEvent);
    };
  });

  React.useEffect(() => {
    if (props.authState.name != "authenticated") {
      console.log(props.authState);
      navigate("/");
    }
  });

  function handleEvent(event) {
    setEvent([...events, event]);
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
    props.onInit((prev) => {
      const updated = [...prev];
      updated.shift();
      return updated;
    });
  }

  function createMessageArray() {
    return items.map((event, i) => {
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
    <main className="container-fluid text-center">
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
            disabled={items.length === 0}
          >
            Delete
          </Button>
        </form>
      </div>
      <div className="container-fluid text-center w-50 quote-box">
        <p className="quote">"{quote}"</p>
        <p className="author">-{quoteAuthor}</p>
      </div>
    </main>
  );
}
