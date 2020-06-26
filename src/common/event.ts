import { v4 as uuidv4 } from "uuid";

export interface EventData {
  id: string;
  timestamp: Date;
  title: string;
  messages: any[];
  messageTitles: string[];
}

export interface ValidatedData {
  id?: undefined;
  timestamp?: undefined;
  title?: string;
  messages: any[];
  messageTitles?: string[];
}

export function enrichEvent(data: ValidatedData | EventData): EventData {
  const id = data.id || uuidv4();
  let messageTitles = data.messageTitles;
  if (!messageTitles) {
    messageTitles = [];
    for (let i = 0; i < data.messages.length; i++) {
      messageTitles[i] = `Message ${i}`;
    }
  }
  return {
    id: id,
    timestamp: data.timestamp || new Date(),
    title: data.title || `Event ${id}`,
    messages: data.messages,
    messageTitles: messageTitles
  };
}
