import "mobx-react-lite/batchingForReactDom";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "@client/components/app";
import { enrichEvent, EventData } from "@common/event";
import { EventStore } from "@client/EventStore";

const appDiv = document.createElement("div");
document.body.appendChild(appDiv);
document.body.setAttribute("style", "margin: 0;");

const getDummyEvents = (count: number): EventData[] => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(
      enrichEvent({
        messages: [
          {
            someRequestData: `Hello request`,
            someMoreRequestData: "Goodbye"
          },
          {
            someResponseData: `Hello response`
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
      })
    );
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
