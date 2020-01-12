import React, { useEffect } from 'react';
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import EventsTable from "./components/EventsTable/EventsTable";
import Page from "src/components/Page/Page";
import { fetchIfNeeded } from "src/actions/eventActions";
import { AppState } from "src/types/StoreTypes";
import { getEventsGroupedByStateSelector } from "src/selectors/eventSelectors";
import { Event } from 'src/types/EventTypes';

interface Props {
  events: {
    active: Event[],
    future: Event[],
    past: Event[]
  };
  isFetching: boolean;
  actions: {
    events: {
      fetchIfNeeded(): void;
    }
  }
}

function EventsPage({ events, isFetching, actions }: Props) {

  const { active, future, past } = events;

  useEffect(() => {
    actions.events.fetchIfNeeded();
    // eslint-disable-next-line
  }, []);

  return (
    <Page title='Events'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <EventsTable title="Active" events={active} isFetching={isFetching} />
        </Grid>
        <Grid item xs={12}>
          <EventsTable title="Future" events={future} isFetching={isFetching} />
        </Grid>
        <Grid item xs={12}>
          <EventsTable title="Past" events={past} isFetching={isFetching} />
        </Grid>
      </Grid>
    </Page>
  )
}

const mapStateToProps = (state: AppState) => {
  const events = getEventsGroupedByStateSelector(state);

  return {
    events,
    isFetching: state.events.isFetching
  }
};

const mapDispatchToProps = (dispatch: any) => ({
  actions: {
    events: {
      fetchIfNeeded: () => dispatch(fetchIfNeeded())
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
