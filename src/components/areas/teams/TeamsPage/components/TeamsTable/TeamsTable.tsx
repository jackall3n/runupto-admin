import React from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import MaterialTable, { Column } from "material-table";
import { Team } from "src/types/TeamTypes";

interface Props extends RouteComponentProps {
  teams: Team[];
  isFetching: boolean;
}

function TeamsTable({ teams, history, isFetching }: Props) {
  const columns: Column<Team>[] = [{
    title: 'Name',
    field: 'name'
  }, {
    title: 'Members',
    field: 'members.length',
  }];

  const onRowClick = (e: any, team: Team | undefined) => history.push(`/teams/${team?.id}`);

  return (
    <>
      <MaterialTable<Team> title="Teams" columns={columns} data={teams} onRowClick={onRowClick}
                           isLoading={isFetching} />
    </>
  );
}

export default withRouter(TeamsTable);
