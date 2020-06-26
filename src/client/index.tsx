import "mobx-react-lite/batchingForReactDom";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "@client/components/app";
import { EventStore } from "@client/EventStore";
import "@client/websocket";

const appDiv = document.createElement("div");
document.body.appendChild(appDiv);
document.body.setAttribute("style", "margin: 0;");
EventStore.refreshEvents();

ReactDOM.render(<App />, appDiv);
