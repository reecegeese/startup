import React from "react";

import "./groups.css";

export function Scores(props) {
  const [scores, setScores] = React.useState([]);

  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  React.useEffect(() => {
    fetch("/api/scores")
      .then((response) => response.json())
      .then((scores) => {
        setScores(scores);
      });
  }, []);

  // Demonstrates rendering an array with React
  const scoreRows = [];
  if (scores.length) {
    for (const [i, score] of scores.entries()) {
      scoreRows.push(
        <tr key={i}>
          <td>{i}</td>
          <td>{score.name.split("@")[0]}</td>
          <td>{score.score}</td>
          <td>{score.date}</td>
        </tr>
      );
    }
  } else {
    scoreRows.push(
      <tr key="0">
        <td colSpan="4">Be the first to score</td>
      </tr>
    );
  }

  return (
    <main className="container-fluid text-center">
      <div className="contributors">
        <h1>{userName}'s lists</h1>
        <div id="contributor-messages">
          {props.list.length > 0 && <p>{userName} has 1 list</p>}
        </div>
      </div>
    </main>
  );
}
