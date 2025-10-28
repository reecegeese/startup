import React from "react";
import "./groups.css";

import { GroupContributors } from "./groupContributors";

export function Groups(props) {
  return (
    <main className="container-fluid text-center">
      <GroupContributors userName={props.userName} list={props.list} />
    </main>
  );
}
