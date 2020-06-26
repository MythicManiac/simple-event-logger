import express = require("express");

const LISTEN_PORT = 8090;

const app: express.Application = express();

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(LISTEN_PORT, () => {
    console.log(`Listening on port ${LISTEN_PORT}`)
});
