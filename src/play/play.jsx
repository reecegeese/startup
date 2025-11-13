import React from "react";
import "./lists.css";

import Button from "react-bootstrap/Button";

export function Play(props) {
  const userName = props.userName;
  const [textBox, setText] = React.useState([]);

  return (
    <main className="container-fluid text-center">
      <div className="contributors">
        <h1>Welcome {userName}</h1>
        <h2>Your current list</h2>
        <div></div>
        <form></form>
        <div className="input-group mb-3">
          <span className="input-group-text">@</span>
          <input
            className="form-control"
            type="text"
            value={textBox}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add an item"
          />
          <Button type="submit" className="btn btn-primary" id="add_button">
            Add
          </Button>
          <Button className="btn btn-secondary" id="delete_button">
            Delete
          </Button>
        </div>
      </div>
    </main>
  );
}
