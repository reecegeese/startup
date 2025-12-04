import React from "react";
import { Event, Notifier } from "./notifier";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./lists.css";

export function Lists(props) {
  const userName = props.userName;
  const events = props.events;
  const setEvent = props.setEvents;
  const items = props.list;
  const navigate = useNavigate();
  const [textBox, setText] = React.useState("");
  const [globalMessages, setGlobalMessages] = React.useState([]);

  React.useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("globalMessages")) || [];
    const now = Date.now();
    const validMessages = stored.filter((msg) => msg.expiresAt > now);
    setGlobalMessages(validMessages);
    validMessages.forEach((msg) => {
      const delay = msg.expiresAt - now;
      setTimeout(() => removeGlobalMessage(msg.id), delay);
    });
  }, []);

  React.useEffect(() => {
    Notifier.addHandler(handleEvent);
    return () => Notifier.removeHandler(handleEvent);
  }, [events]);

  React.useEffect(() => {
    if (props.authState.name != "authenticated") {
      console.log(props.authState);
      navigate("/");
    }
  }, [props.authState, navigate]);

  function handleEvent(event) {
    setEvent((prev) => [...prev, event]);
  }

  function handleAddClick(e) {
    e.preventDefault();
    if (!textBox) return;
    const newEvent = {
      id: crypto.randomUUID(),
      from: userName,
      type: Event.End,
      item: textBox,
    };
    setEvent((prev) => [...prev, newEvent]);
    setGlobalMessages((prev) => [newEvent, ...prev]);
    setText("");
    setTimeout(() => {
      setGlobalMessages((prev) => prev.filter((ev) => ev.id !== newEvent.id));
    }, 10000);
  }

  function handleDeleteClick(e) {
    e.preventDefault();
    setEvent((prev) => prev.slice(1));
    props.onInit((prev) => prev.slice(1));
  }

  function createMessageArray() {
    return events.map((event, i) => (
      <div key={i} className="event">
        {event.from} added {event.item}
      </div>
    ));
  }

  function createGlobalMessage() {
    return globalMessages.map((event) => (
      <GlobalMessage key={event.id} event={event} />
    ));
  }

  function GlobalMessage({ event }) {
    let message = "unknown";
    if (event.type === Event.End) {
      message = `${event.from} added ${event.item}`;
    }

    return (
      <div className="event">
        <span className="global-message"></span> {message}
      </div>
    );
  }

  function addGlobalMessage(event) {
    const expiresAt = Date.now() + 10000;
    const newMsg = { ...event, expiresAt };
    setGlobalMessages((prev) => {
      const updated = [newMsg, ...prev];
      localStorage.setItem("globalMessages", JSON.stringify(updated));
      return updated;
    });
    setTimeout(() => removeGlobalMessage(newMsg.id), 30000);
  }

  function removeGlobalMessage(id) {
    setGlobalMessages((prev) => {
      const updated = prev.filter((msg) => msg.id !== id);
      localStorage.setItem("globalMessages", JSON.stringify(updated));
      return updated;
    });
  }

  return (
    <main className="container-fluid text-center">
      <div>
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
            disabled={events.length === 0}
          >
            Delete
          </Button>
        </form>
        <div className="container-fluid text-center global-box">
          <p className="globalText">Global Updates</p>
          <div id="global-message">{createGlobalMessage()}</div>
        </div>
      </div>
    </main>
  );
}
