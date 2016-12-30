"use strict";
const express = require("express");
const path = require("path");
const database = require("./database");
const api = require("./api");
const port = +process.env.PORT || 8080;
database.connect().then(db => {
    const app = express();
    app.use(express.static(path.resolve(__dirname, '../static')));
    api.init(app, db);
    app.listen(port, () => {
        console.log(`Server listening on localhost:${port}`);
    });
});
