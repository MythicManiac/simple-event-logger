import * as React from "react";

import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Typography
} from "@material-ui/core";
import styled from "styled-components";

import { EventsView } from "@client/components/eventlist";
import { SelectionView } from "@client/components/selection";

export const App = () => {
  return (
    <>
      <CssBaseline />
      <FulscreenBox>
        <Box>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">Simple Event Logger</Typography>
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
