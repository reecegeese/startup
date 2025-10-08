import React from "react";
import "./groups.css";

export function Groups() {
  return (
    <main className="container-fluid text-center">
      <div>
        <main class="container-fluid justify-content-center">
          <h1>Your Lists</h1>
          <table class="custom-bordered-table">
            <thead>
              <tr>
                <th>List Name</th>
                <th>Total Items</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Breakfast</td>
                <td>8</td>
                <td>June 14, 2023</td>
              </tr>
              <tr>
                <td>Birthday Suprise</td>
                <td>19</td>
                <td>October 7, 2019</td>
              </tr>
              <tr>
                <td>Living Room</td>
                <td>4</td>
                <td>Janurary 30, 2024</td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
    </main>
  );
}
