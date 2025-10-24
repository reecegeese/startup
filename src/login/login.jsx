import React from "react";
import "./login.css";

import { EmailCollector } from "./emailCollector";

export function Login(props) {
  return (
    <main className="container-fluid text-center">
      <EmailCollector userName={props.userName} />
    </main>
  );
}
