import React from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import MaterialTable, { Column } from "material-table";

function createTeam(id: number, name: string, members: number) {
  return { id, name, members };
}

const teams = [
  createTeam(1, 'Run Things', 4000),
  createTeam(2, 'Worthing Run Club', 5),
];

type Team = {
  id: number;
  members: number;
}

function TeamsTable(props: RouteComponentProps) {
  const columns: Column<Team>[] = [{
    title: 'Name',
    field: 'name'
  },{
    title: 'Members',
    field: 'members'
  }];

  const onRowClick = (e: any, team: Team | undefined) => props.history.push(`/teams/${team?.id}`);

  return (
    <>
      <MaterialTable<Team> title="Teams" columns={columns} data={teams} onRowClick={onRowClick} />
    </>
  );
}

export default withRouter(TeamsTable);
