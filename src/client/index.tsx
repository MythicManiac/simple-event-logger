import "mobx-react-lite/batchingForReactDom";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "@client/components/app";
import { EventData } from "@common/event";
import { EventStore } from "@client/EventStore";

const appDiv = document.createElement("div");
document.body.appendChild(appDiv);
document.body.setAttribute("style", "margin: 0;");

const getDummyEvents = (count: number): EventData[] => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push({
      id: i.toString(),
      title: `Event ${i} with a title`,
      timestamp: new Date(new Date().getTime() + i * 1000),
      messages: [
        {
          someRequestData: `Hello request ${i}`,
          someMoreRequestData: "Goodbye"
        },
        {
          someResponseData: `Hello response ${i}`
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
  }
  return result;
};

for (const event of getDummyEvents(5)) {
  EventStore.addEvent(event);
}

ReactDOM.render(<App />, appDiv);
