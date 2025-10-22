import React from "react";
import "./groups.css";

import { Contributors } from "./contributors";

export function Groups(props) {
  return (
    <main className="container-fluid text-center">
      <Contributors userName={props.userName} />
    </main>
  );
}
