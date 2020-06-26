import { EventData } from "@common/event";
import * as React from "react";
import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import styled from "styled-components";

export interface EventsViewProps {
  events: EventData[];
  onSelect?: (event: EventData) => void;
}
export const EventsView = (props: EventsViewProps) => {
  return (
    <EventList dense={true}>
      {props.events.map((_, index, array) => {
        const i = array.length - 1 - index;
        const event = array[i];
        return (
          <React.Fragment key={event.id}>
            <ListItem
              button
              onClick={() => {
                if (props.onSelect) props.onSelect(event);
              }}
            >
              <ListItemText primary={event.title} />
            </ListItem>
            {i > 0 && <Divider />}
          </React.Fragment>
        );
      })}
    </EventList>
  );
};

const EventList = styled(List)`
  width: 100%;
  overflow-y: scroll;
`;
