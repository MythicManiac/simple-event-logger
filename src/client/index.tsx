import "mobx-react-lite/batchingForReactDom";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "@client/components/app";
import { EventData } from "@common/event";
import { EventStore } from "@client/EventStore";

const appDiv = document.createElement("div");
document.body.appendChild(appDiv);
document.body.setAttribute("style", "margin: 0;");

let NEXT_ID = 0;
const getDummyEvents = (count: number): EventData[] => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push({
      id: NEXT_ID.toString(),
      title: `Event ${NEXT_ID} with a title`,
      timestamp: new Date(new Date().getTime() + NEXT_ID * 1000),
      messages: [
        {
          someRequestData: `Hello request ${NEXT_ID}`,
          someMoreRequestData: "Goodbye"
        },
        {
          someResponseData: `Hello response ${NEXT_ID}`
        },
        "Just a string",
        "Just a string",
        "Just a string",
        "Just a string",
        "Just a string",
        "Just a string",
        "Just a string",
        "Just a string",
        "Just a string",
        "Just a string"
      ]
    });
    NEXT_ID += 1;
  }
  return result;
};

for (const event of getDummyEvents(5)) {
  EventStore.addEvent(event);
}

const addEventLoop = () => {
  EventStore.addEvent(getDummyEvents(1)[0]);
  setTimeout(addEventLoop, 100);
};

ReactDOM.render(<App />, appDiv);
addEventLoop();
