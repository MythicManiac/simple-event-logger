import socketIOClient from "socket.io-client";
import { API_HOST } from "@client/consts";
import {
  deserializeEventData,
  SerializedEventData
} from "@client/serialization";
import { EventStore } from "@client/EventStore";
import { WebsocketEventType } from "@common/consts";

const socket = socketIOClient(API_HOST);
socket.on("connect", () => {
  console.log("Connected");
});
socket.on("disconnect", () => {
  console.log("Disconnected");
});
socket.on(WebsocketEventType.EVENT_LOG_ENTRY, (data: SerializedEventData) => {
  EventStore.addEvent(deserializeEventData(data));
});
