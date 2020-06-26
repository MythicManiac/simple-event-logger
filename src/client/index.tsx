import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "@client/components/app";

const appDiv = document.createElement("div");
document.body.appendChild(appDiv);
document.body.setAttribute("style", "margin: 0;");

ReactDOM.render(<App />, appDiv);
