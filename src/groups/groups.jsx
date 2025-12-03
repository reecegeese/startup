import React from "react";
import { useNavigate } from "react-router-dom";
import "./groups.css";

export function Groups(props) {
  const userName = props.userName;
  const items = props.list;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (props.authState.name != "authenticated") {
      console.log(props.authState);
      navigate("/");
    }
  });

  return (
    <main className="container-fluid text-center">
      <div className="contributors">
        <h1>{userName}'s lists</h1>
        <div id="contributor-messages">
          {items.length > 0 && <p>{userName} has 1 list</p>}
        </div>
      </div>
    </main>
  );
}
