import express = require("express");
import bodyParser = require("body-parser");

const LISTEN_PORT = 8090;
const MAX_HISTORY = 1000;

const app: express.Application = express();
app.use(bodyParser.json());
app.use(express.static("./dist"));

interface Event {
  timestamp: Date;
  messages: any[];
}

const events: Event[] = [];

// TODO: Return the frontend here
app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/api/event/", (req, res) => {
  if (req.body.messages) {
    if (Array.isArray(req.body.messages)) {
      if (events.length == MAX_HISTORY) {
        events.shift();
      }
      events.push({
        timestamp: new Date(),
        messages: req.body.messages
      });
      res.send({ result: "success" });
    } else {
      res.send({ result: "failure", reason: "'messages' must be an array" });
    }
  } else {
    res.send({ result: "failure", reason: "missing 'messages' from body" });
  }
});

app.get("/api/event/", (req, res) => {
  res.send(JSON.stringify(events));
});

app.listen(LISTEN_PORT, () => {
  console.log(`Listening on port ${LISTEN_PORT}`);
});
