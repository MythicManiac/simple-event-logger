import * as React from "react";

import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import styled from "styled-components";
import PauseIcon from "@material-ui/icons/PauseCircleFilled";
import RecordIcon from "@material-ui/icons/PlayCircleFilled";
import ClearIcon from "@material-ui/icons/DeleteSweep";

import { EventsView } from "@client/components/eventlist";
import { SelectionView } from "@client/components/selection";
import { observer } from "mobx-react";
import { EventStore } from "@client/EventStore";

export const ToolbarButtons = observer(() => {
  const toggleLogging = () => {
    EventStore.setIsLogging(!EventStore.isLogging);
  };

  const clearHistory = () => {
    EventStore.clearUnpinned();
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="toggle log capture"
        onClick={toggleLogging}
      >
        {EventStore.isLogging ? <PauseIcon /> : <RecordIcon />}
      </IconButton>

      <IconButton
        color="inherit"
        aria-label="clear history"
        onClick={clearHistory}
      >
        <ClearIcon />
      </IconButton>
    </>
  );
});

export const App = () => {
  return (
    <>
      <CssBaseline />
      <FulscreenBox>
        <Box>
          <AppBar position="static">
            <Toolbar>
              <Title variant="h6">Simple Event Logger</Title>
              <ToolbarButtons />
            </Toolbar>
          </AppBar>
        </Box>
        <MainBox>
          <EventsView />
          <SelectionView />
        </MainBox>
      </FulscreenBox>
    </>
  );
};

const Title = styled(Typography)`
  margin-right: 20px;
`;

const FulscreenBox = styled(Box)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

const MainBox = styled(Box)`
  width: 100%;
  padding: 0;
  margin: 0;
  flex: 1 0;
  min-height: 0;
  display: flex;
  flex-direction: row;
`;
