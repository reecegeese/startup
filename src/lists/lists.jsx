import React from "react";
import "./lists.css";

import { Contributors } from "./contributors";
import { AuthState } from "./authState";

export function Lists({ props, authState }) {
  return (
    <main className="container-fluid text-center">
      {authState === AuthState.Authenticated && (
        <Contributors
          userName={props.userName}
          items={props.list}
          onInit={props.onInit}
        />
      )}
    </main>
  );
}
