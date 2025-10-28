import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { Lists } from "./lists/lists";
import { Groups } from "./groups/groups";
import { Tutorial } from "./tutorial/tutorial";

export default function App() {
  return (
    <BrowserRouter>
      <div className="body">
        <header className="container-fluid">
          <nav className="navbar fixed-top">
            <div className="navbar-brand">
              List Maker<sup>&reg;</sup>
            </div>
            <menu className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="lists">
                  Lists
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="groups">
                  Groups
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="tutorial">
                  Tutorial
                </NavLink>
              </li>
            </menu>
          </nav>
        </header>

        <Routes>
          <Route path="/login" element={<Login />} exact />
          <Route path="/lists" element={<Lists />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="body">
          <div className="container-fluid">
            <span>Created by Reece Loveridge</span>
            <a
              className="text-reset"
              href="https://github.com/reecegeese/startup.git"
            >
              My Github
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
function NotFound() {
  return (
    <main className="container-fluid text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}
