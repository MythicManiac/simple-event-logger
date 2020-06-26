import { EventData } from "@common/event";

export interface SerializedEventData {
  id: string;
  timestamp: string;
  title: string;
  messages: any[];
  messageTitles: string[];
}

export function deserializeEventData(data: SerializedEventData): EventData {
  return {
    ...data,
    timestamp: new Date(Date.parse(data.timestamp))
  };
}
