import React from 'react';
import { Checkbox } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";
import MaterialTable, { Column } from "material-table";
import { Event } from "src/types/EventTypes";

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
  events: Event[];
}

function UserEventsTable({ history, events }: Props) {

  const columns: Column<Event>[] = [{
    title: 'Description',
    field: 'summary.description'
  }, {
    title: 'Distance',
    type: 'numeric',
    render: data => ''//`${data.progress} / ${data.goal}`
  }, {
    title: 'Completed',
    type: 'numeric',
    render: data => <Checkbox size='small' disabled checked={false} />
  }];

  const onClick = (e: any, r: any) => history.push(`/events/${r.id}`);

  return (
    <>
      <MaterialTable title="Events"
                     columns={columns}
                     data={events}
                     onRowClick={onClick}
      />
    </>
  );
}

export default withRouter(UserEventsTable);
