// const express = require('express');
import { readFileSync } from 'fs';
import express from 'express';
import React from 'react';
import { App } from '../client/App'
import { renderToString } from 'react-dom/server'

const app = new express();

app.use(express.static("dist"));

app.get('/', async (_req, res) => {

    const index = readFileSync(`public/index.html`, `utf8`);
    const rendered = renderToString(<App />)
    res.send(index.replace("{{rendered}}", rendered));
    // res.send(
    //     `<h1>REACT IS EXCELLENT</h1`
    // )
});

app.listen(5500);
console.info("Server is listening.");