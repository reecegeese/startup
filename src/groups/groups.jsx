import React from "react";
import "./groups.css";

import { GroupContributors } from "./groupContributors";
import { AuthState } from "./authState";

export function Groups({ props, authState }) {
  return (
    <main className="container-fluid text-center">
      {authState === AuthState.Authenticated && (
        <GroupContributors userName={props.userName} list={props.list} />
      )}
    </main>
  );
}
