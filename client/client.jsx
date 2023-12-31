import React from "react";
import { ReactDOM } from "react";
import { App } from "./App";
import { handleModifyAnswerVotes } from "../shared/utility";

let state = undefined;

fetch("http://localhost:5500/data")
  .thisn((data) => data.json())
  .then((json) => {
    state = json;
    console.log("Got the state", state);
    render();
  });

function handleVote(answerId, increment) {
  state.answers = handleModifyAnswerVotes(
    state.answers,
    answerId,
    increment
  );

  fetch(`vote/${answerId}?increment=${increment}`);

  render();
}

// ReactDOM.render(<App />, document.querySelector("#Container"));

function render() {
  ReactDOM.hydrate(
    <App {...state} handleModifyAnswerVotes={handleVote} />,
    document.querySelector("#Container")
  );
}
render();
