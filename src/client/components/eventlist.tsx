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
import { useState } from "react";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import TurnedInIcon from "@material-ui/icons/TurnedIn";

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
  return ("0000" + date.getMilliseconds()).slice(-4);
};

export const formatTimestamp = (date: Date) => {
  return `${formatHour(date)}:${formatMinute(date)}:${formatSecond(
    date
  )}.${formatMillisecond(date)}`;
};

export interface EventsViewProps {
  events: EventData[];
  onSelect?: (event: EventData) => void;
}
export const EventsView = (props: EventsViewProps) => {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [pinnedEvents] = useState<Set<string>>(new Set());

  // This is used only to trigger a refresh
  const [lastPinAction, setLastPinAction] = useState<string>();

  const toggleEventPin = (event: EventData) => {
    if (pinnedEvents.has(event.id)) {
      pinnedEvents.delete(event.id);
      setLastPinAction(`${event.id}-removed`);
    } else {
      pinnedEvents.add(event.id);
      setLastPinAction(`${event.id}-added`);
    }
  };

  const sortedEvents = props.events.sort((a, b) => {
    return +pinnedEvents.has(a.id) - +pinnedEvents.has(b.id);
  });

  const renderItem = (event: EventData) => {
    return (
      <ListItem
        button={true}
        selected={event.id === selectedId}
        onClick={() => {
          setSelectedId(event.id);
          if (props.onSelect) props.onSelect(event);
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
            onClick={() => toggleEventPin(event)}
          >
            {pinnedEvents.has(event.id) ? (
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
      {sortedEvents.map((_, index, array) => {
        const i = array.length - 1 - index;
        const event = array[i];
        return (
          <React.Fragment key={event.id}>
            {renderItem(event)}
            {i > 0 && <Divider />}
          </React.Fragment>
        );
      })}
    </EventList>
  );
};

const EventList = styled(List)`
  width: 100%;
  min-height: 0;
  overflow-y: scroll;
`;
