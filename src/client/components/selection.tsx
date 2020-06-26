import * as React from "react";

import styled from "styled-components";
import { AppBar, Box, Tab, Tabs, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { EventStore } from "@client/EventStore";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`selection-tabpanel-${index}`}
      aria-labelledby={`selection-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <pre>{children}</pre>
        </Box>
      )}
    </div>
  );
}

function makeTabProps(index: any) {
  return {
    id: `selection-tab-${index}`,
    "aria-controls": `selection-tabpanel-${index}`
  };
}

export const SelectionView = observer(() => {
  const [tab, setTab] = useState(0);
  const event = EventStore.selectedEvent;

  useEffect(() => {
    setTab(0);
  }, [event]);

  if (!event) {
    return (
      <CenteredTextBox>
        <Typography variant="h6">No event selected</Typography>
      </CenteredTextBox>
    );
  }
  if (event.messages.length < 0) {
    return (
      <CenteredTextBox>
        <Typography variant="h6">Event has no messages</Typography>
      </CenteredTextBox>
    );
  }

  const getMessageTitle = (index: number) => {
    if (event.messageTitles && event.messageTitles.length < index) {
      return event.messageTitles[index];
    } else {
      return `Message ${index + 1}`;
    }
  };

  return (
    <SelectionViewBox>
      <AppBar position="static">
        <Tabs
          value={tab}
          onChange={(_, newTab) => setTab(newTab)}
          variant={"scrollable"}
          aria-label="simple tabs example"
        >
          {event.messages.map((_, index) => (
            <Tab
              key={index}
              label={getMessageTitle(index)}
              {...makeTabProps(index)}
              wrapped={true}
            />
          ))}
        </Tabs>
      </AppBar>
      {event.messages.map((message, index) => (
        <TabPanel value={tab} index={index} key={index}>
          {typeof message === "string"
            ? message
            : JSON.stringify(message, null, 2)}
        </TabPanel>
      ))}
    </SelectionViewBox>
  );
});

const SelectionViewBox = styled(Box)`
  width: 100%;
  min-width: 0;
`;

const CenteredTextBox = styled(Box)`
  width: 100%;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
