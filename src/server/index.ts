import express = require("express");
import bodyParser = require("body-parser");
import { EventData } from "@common/event";
import { v4 as uuidv4 } from "uuid";

const LISTEN_PORT = 8090;
const MAX_HISTORY = 30;

const app: express.Application = express();
app.use(bodyParser.json());
app.use(express.static("./dist"));

interface Event {
  timestamp: Date;
  messages: any[];
}

let events: Event[] = [];

interface ValidatedData {
  title?: string;
  messages: any[];
  messageTitles?: string[];
}

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

function enrichEvent(data: ValidatedData): EventData {
  const id = uuidv4();
  let messageTitles = data.messageTitles;
  if (!messageTitles) {
    messageTitles = [];
    for (let i = 0; i < data.messages.length; i++) {
      messageTitles[i] = `Message ${i}`;
    }
  }
  return {
    id: id,
    timestamp: new Date(),
    title: data.title || `Event ${id}`,
    messages: data.messages,
    messageTitles: messageTitles
  };
}

app.post("/api/event/", (req, res) => {
  const result = validateIncomingEventData(req.body);
  if (result.errors) {
    res.send({ result: "failure", errors: result.errors });
  } else {
    if (events.length == MAX_HISTORY) {
      events.shift();
    }
    events.push(enrichEvent(result.validatedData));
    if (events.length > MAX_HISTORY) {
      events = events.slice(Math.max(events.length - MAX_HISTORY, 0));
    }
    res.send({ result: "success" });
  }
});

app.get("/api/event/", (req, res) => {
  res.send(JSON.stringify(events));
});

app.listen(LISTEN_PORT, () => {
  console.log(`Listening on port ${LISTEN_PORT}`);
});
