import React from "react";
import "./login.css";

export function Login() {
  return (
    <main className="container-fluid text-center">
      <div>
        <main className="container-fluid text-center pt-5 pb-5">
          <div className="justify-content-center">
            <h1>Start making lists</h1>
            <form method="get" action="play.html">
              <div className="input-group mb-3">
                <span className="input-group-text">@</span>
                <input
                  className="form-control"
                  type="text"
                  placeholder="your@email.com"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">🔒</span>
                <input
                  className="form-control"
                  type="password"
                  placeholder="password"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                id="login_button"
              >
                Login
              </button>
              <button
                type="submit"
                className="btn btn-secondary"
                id="create_button"
              >
                Create
              </button>
            </form>
          </div>
        </main>
      </div>
    </main>
  );
}
