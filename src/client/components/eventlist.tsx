import { EventData } from "@common/event";
import * as React from "react";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "@material-ui/core";
import styled from "styled-components";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import { observer } from "mobx-react";
import { EventStore } from "@client/EventStore";

export const formatHour = (date: Date) => {
  return ("00" + date.getHours()).slice(-2);
};

export const formatMinute = (date: Date) => {
  return ("00" + date.getMinutes()).slice(-2);
};

export const formatSecond = (date: Date) => {
  return ("00" + date.getSeconds()).slice(-2);
};

export const formatMillisecond = (date: Date) => {
  return ("000" + date.getMilliseconds()).slice(-3);
};

export const formatTimestamp = (date: Date) => {
  return `${formatHour(date)}:${formatMinute(date)}:${formatSecond(
    date
  )}.${formatMillisecond(date)}`;
};

export const EventsView = observer(() => {
  const renderItem = (event: EventData) => {
    return (
      <ListItem
        button={true}
        selected={EventStore.selectedEventId === event.id}
        onClick={() => {
          EventStore.selectEvent(event);
        }}
      >
        <ListItemText
          primary={event.title}
          secondary={formatTimestamp(event.timestamp)}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => EventStore.toggleEventPin(event)}
          >
            {EventStore.isPinned(event) ? (
              <TurnedInIcon />
            ) : (
              <TurnedInNotIcon />
            )}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  return (
    <EventList dense={true}>
      {EventStore.pinnedEvents.map(event => {
        return (
          <React.Fragment key={event.id}>
            {renderItem(event)}
            <Divider />
          </React.Fragment>
        );
      })}
      {EventStore.events.map((_, index, array) => {
        const i = array.length - 1 - index;
        const event = array[i];
        return (
          <React.Fragment key={event.id}>
            {renderItem(event)}
            <Divider />
          </React.Fragment>
        );
      })}
    </EventList>
  );
});

const EventList = styled(List)`
  width: 100%;
  min-height: 0;
  overflow-y: scroll;
`;
