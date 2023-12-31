// const express = require('express');
import { readFileSync } from "fs";
import express from "express";
import React from "react";
import { App } from "../client/App";
import { renderToString } from "react-dom/server";
import { handleModifyAnswerVotes } from "../shared/utility";

const data = {
  questions: [
    {
      questionId: "Q1",
      content: "Which back end solution should we use for our application?",
    },
    {
      questionId: "Q2",
      content:
        "What percentage of developer time should be devoted to end-to-end testing?",
    },
    {
      questionId: "Q3",
      content: "Should we use JQuery or Fetch for Ajax?",
    },
  ],
  answers: [
    {
      answerId: "A1",
      questionId: "Q1",
      upvotes: 2,
      content: "Apache",
    },
    {
      answerId: "A2",
      questionId: "Q1",
      upvotes: 1,
      content: "Java",
    },
    {
      answerId: "A3",
      questionId: "Q1",
      upvotes: 4,
      content: "Node.js",
    },
    {
      answerId: "A4",
      questionId: "Q2",
      upvotes: 2,
      content: "25%",
    },
    {
      answerId: "A5",
      questionId: "Q2",
      upvotes: 1,
      content: "50%",
    },
    {
      answerId: "A6",
      questionId: "Q2",
      upvotes: 1,
      content: "75%",
    },
    {
      answerId: "A7",
      questionId: "Q3",
      upvotes: 2,
      content: "JQuery",
    },
    {
      answerId: "A8",
      questionId: "Q3",
      upvotes: 4,
      content: "Ajax",
    },
  ],
};

const app = new express();

app.use(express.static("dist"));
app.get("/vote/:answerId", (req, res) => {
  const { query, params } = req;
  data.answers = handleModifyAnswerVotes(
    data.answers,
    params.answerId,
    +query.increment
  );
  res.send("OK");
});

app.get("/data", async (_req, res) => {
  res.json(data);
});

app.get("/", async (_req, res) => {
  const index = readFileSync(`public/index.html`, `utf8`);
  const rendered = renderToString(<App {...data} />);
  res.send(index.replace("{{rendered}}", rendered));
});

app.listen(5500);
console.info("Server is listening.");
