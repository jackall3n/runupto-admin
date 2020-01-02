import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";
import MaterialTable, { Column } from "material-table";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  types: {
    '& > *': {
      marginRight: theme.spacing(0.5)
    },
  }
}));

/*
* Events require us to set them up at any point, and the back end allowing us to be in charge of a range of
* variables such as distance, duration, cost, team creation (including our ability to edit teams).
* Needs to be dynamic enough for mid-event changes to people’s targets or team memberships. Should also
* allow us to select which types of activity to pull through from strava. And needs a ‘manual upload’
* option for people to submit evidence without strava.
*
* Live dashboard of stats would be great. How far in total, who’s completed etc.
* */

interface Props extends RouteComponentProps {
  title: string;
  events: Event[]
}

type Event = {
  id: number;
  description: string;
  types: string[];
  start: string;
  end: string;
  participants: number;
}

function EventsTable(props: Props) {
  const classes = useStyles();

  const columns: Column<Event>[] = [{
    title: 'Description',
    field: 'description'
  }, {
    title: 'Types',
    render: ({ types }) => (
      <div className={classes.types}>
        {types.map(type => <Chip key={type} size="small" label={type} />)}
      </div>
    )
  }, {
    title: 'Start',
    field: 'start',
  }, {
    title: 'End',
    field: 'end',
  }, {
    title: 'Participants',
    type: 'numeric',
    field: 'participants'
  }];

  const onRowClick = (e: any, event: Event | undefined) => props.history.push(`/events/${event?.id}`);

  return (
    <>
      <MaterialTable<Event> localization={{
        body: {
          emptyDataSourceMessage: 'There is nothing to display'
        }
      }} options={{ showEmptyDataSourceMessage: true }} title={props.title} columns={columns} data={props.events}
                            onRowClick={onRowClick} />
    </>
  );
}

export default withRouter(EventsTable);
