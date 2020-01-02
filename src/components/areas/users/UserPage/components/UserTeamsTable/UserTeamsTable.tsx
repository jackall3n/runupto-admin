import React from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import MaterialTable, { Column } from "material-table";

function createData(id: number, name: string) {
  return { id, name };
}

const teams = [
  createData(1, 'Run things'),
  createData(2, 'Worthing run club'),
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

type UserTeam = {
  id: number;
  name: string;
}

function UserTeamsTable(props: RouteComponentProps) {

  const columns: Column<UserTeam>[] = [{
    title: 'Name',
    field: 'name'
  }];

  const onClick = (e: any, r: any, t?: () => void) => props.history.push(`/teams/${r.id}`);

  return (
    <>
      <MaterialTable title="Teams"
                     columns={columns}
                     data={teams}
                     onRowClick={onClick}
      />
    </>
  );
}

export default withRouter(UserTeamsTable);
