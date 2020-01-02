import React from 'react';
import { Checkbox } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";
import MaterialTable, { Column } from "material-table";
import Button from "@material-ui/core/Button";

function createData(id: number, description: string, progress: number, goal: number, completed: boolean) {
  return { id, description, progress, goal, completed };
}

const events = [
  createData(1, 'Run up to Christmas', 35, 100, false),
  createData(2, 'Swim up to Christmas', 103, 100, true),
];

/*
* Events require us to set them up at any point, and the back end allowing us to be in charge of a range of
* variables such as distance, duration, cost, team creation (including our ability to edit teams).
* Needs to be dynamic enough for mid-event changes to people’s targets or team memberships. Should also
* allow us to select which types of activity to pull through from strava. And needs a ‘manual upload’
* option for people to submit evidence without strava.
*
* Live dashboard of stats would be great. How far in total, who’s completed etc.
* */

type UserEvent = {
  id: number;
  description: string;
  progress: number;
  goal: number;
  completed: boolean;
}

function UserEventDetail() {
  return (
    <div style={{ margin: '1rem' }}>
      <Button>Manual Upload</Button>
    </div>
  )
}

function TeamEventsTable(props: RouteComponentProps) {

  const columns: Column<UserEvent>[] = [{
    title: 'Description',
    field: 'description'
  }, {
    title: 'Distance',
    type: 'numeric',
    render: data => `${data.progress} / ${data.goal}`
  }, {
    title: 'Completed',
    type: 'numeric',
    render: data => <Checkbox size='small' disabled checked={data.completed} />
  }];

  const onClick = (e: any, r: any, t?: () => void) => t?.();

  return (
    <>
      <MaterialTable title="Events"
                     columns={columns}
                     data={events}
                     onRowClick={onClick}
                     detailPanel={UserEventDetail}
      />
    </>
  );
}

export default withRouter(TeamEventsTable);
