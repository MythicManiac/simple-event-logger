import * as React from "react";

import { Box } from "@material-ui/core";
import styled from "styled-components";

import { EventData } from "@common/event";
import { EventsView } from "@client/components/eventlist";
import { useState } from "react";
import { SelectionView } from "@client/components/selection";

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
        "Just a string"
      ]
    });
  }
  return result;
};

export const App = () => {
  const [events] = useState(getDummyEvents(200));
  const [selectedEvent, setSelectedEvent] = useState<EventData | undefined>(
    undefined
  );

  return (
    <MainBox>
      <EventsView events={events} onSelect={setSelectedEvent} />
      <SelectionView selectedEvent={selectedEvent} />
    </MainBox>
  );
};

const MainBox = styled(Box)`
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
`;
