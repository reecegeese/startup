import React from "react";
import "./lists.css";

import { Contributors } from "./contributors";

export function Lists(props) {
  return (
    <main className="container-fluid text-center">
      <Contributors userName={props.userName} />
    </main>
  );
}
