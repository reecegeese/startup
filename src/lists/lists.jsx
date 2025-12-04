import React from "react";
import { useNavigate } from "react-router-dom";
import { Event, Notifier } from "./notifier";
import Button from "react-bootstrap/Button";
import "./lists.css";

export function Lists(props) {
  const userName = props.userName;
  const events = props.events;
  const setEvent = props.setEvents;
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
    const handleGlobalEvent = (event) => {
      const newMsg = {
        id: crypto.randomUUID(),
        from: event.from,
        type: event.type,
        value: event.value,
        expiresAt: Date.now() + 30000,
      };
      setGlobalMessages((prev) => {
        const updated = [newMsg, ...prev];
        localStorage.setItem("globalMessages", JSON.stringify(updated));
        return updated;
      });
      setTimeout(() => removeGlobalMessage(newMsg.id), 30000);
    };
    Notifier.addHandler(handleGlobalEvent);
    return () => Notifier.removeHandler(handleGlobalEvent);
  }, []);

  React.useEffect(() => {
    if (props.authState.name !== "authenticated") {
      navigate("/");
    }
  }, [props.authState, navigate]);

  function handleAddClick(e) {
    e.preventDefault();
    if (!textBox) return;
    const newEvent = {
      id: crypto.randomUUID(),
      from: userName,
      type: Event.End,
      value: textBox,
    };
    setEvent((prev) => [...prev, newEvent]);
    const newMsg = {
      ...newEvent,
      expiresAt: Date.now() + 30000,
    };
    setGlobalMessages((prev) => {
      const updated = [newMsg, ...prev];
      localStorage.setItem("globalMessages", JSON.stringify(updated));
      return updated;
    });
    Notifier.broadcastEvent(userName, Event.End, textBox);
    setText("");
    setTimeout(() => removeGlobalMessage(newMsg.id), 30000);
  }

  function handleDeleteClick(e) {
    e.preventDefault();
    setEvent((prev) => prev.slice(0, -1));
  }

  function removeGlobalMessage(id) {
    setGlobalMessages((prev) => {
      const updated = prev.filter((msg) => msg.id !== id);
      localStorage.setItem("globalMessages", JSON.stringify(updated));
      return updated;
    });
  }

  function createMessageArray() {
    return events.map((event, i) => (
      <div key={i} className="event">
        {event.from} added {event.value}
      </div>
    ));
  }

  function createGlobalMessage() {
    return globalMessages.map((event) => (
      <div key={event.id} className="event">
        <span className="global-message">{event.from}</span> added {event.value}
      </div>
    ));
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
          <Button type="submit" id="add_button" disabled={!textBox}>
            Add
          </Button>
          <Button
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
