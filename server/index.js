// const express = require('express');
import { readFileSync } from 'fs';
import express from 'express';

const app = new express();

app.use(express.static("dist"));

app.get('/', async (_req, res) => {

    const index = readFileSync(`public/index.html`, `utf8`);
    res.send(index);
    // res.send(
    //     `<h1>REACT IS EXCELLENT</h1`
    // )
});

app.listen(5500);
console.info("Server is listening.");