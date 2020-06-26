import express = require("express");
const app: express.Application = express();

import bodyParser = require("body-parser");
import cors = require("cors");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

import { enrichEvent, ValidatedData } from "../common/event";
import { WebsocketEventType } from "../common/consts";
import { Socket } from "socket.io";

const LISTEN_PORT = 8090;
const MAX_HISTORY = 30;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("./dist"));

interface Event {
  timestamp: Date;
  messages: any[];
}

let events: Event[] = [];

// TODO: Use JSON schema
function validateIncomingEventData(
  data: any
): { errors: string[] } | { errors?: undefined; validatedData: ValidatedData } {
  const errors = [];
  if (data.title && typeof data.title !== "string") {
    errors.push("'title' must be a string");
  }
  if (data.messages) {
    if (!Array.isArray(data.messages)) {
      errors.push("'messages' must be an array");
    }
  } else {
    errors.push("'messages' must be defined");
  }
  if (data.messageTitles) {
    if (Array.isArray(data.messageTitles)) {
      for (const key in data.messageTitles) {
        if (typeof data.messageTitles[key] !== "string") {
          errors.push(`'messageTitles[${key}] must be a string`);
        }
      }
    } else {
      errors.push("'messageTitles' must be an array");
    }
  }
  if (errors.length > 0) {
    return {
      errors
    };
  } else {
    return {
      validatedData: {
        title: data.title,
        messages: data.messages,
        messageTitles: data.messageTitles
      }
    };
  }
}

io.on("connection", (socket: Socket) => {
  console.log("Client connected");
  socket.on("disconnect", reason => {
    console.log(`Client disconnected: ${reason}`);
  });
});

app.post("/api/event/", (req, res) => {
  const result = validateIncomingEventData(req.body);
  if (result.errors) {
    res.send({ result: "failure", errors: result.errors });
  } else {
    if (events.length == MAX_HISTORY) {
      events.shift();
    }
    const enriched = enrichEvent(result.validatedData);
    events.push(enriched);
    io.emit(WebsocketEventType.EVENT_LOG_ENTRY, enriched);
    if (events.length > MAX_HISTORY) {
      events = events.slice(Math.max(events.length - MAX_HISTORY, 0));
    }
    res.send({ result: "success" });
  }
});

app.get("/api/event/", (req, res) => {
  res.send(JSON.stringify(events));
});

http.listen(LISTEN_PORT, () => {
  console.log(`Listening on port ${LISTEN_PORT}`);
});
