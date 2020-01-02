import React from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import MaterialTable, { Column } from "material-table";

function createData(id: number, name: string) {
  return { id, name };
}

const members = [
  createData(1, 'Jack Allen'),
  createData(1, 'Kevin Betts'),
];

type TeamMember = {
  id: number;
  name: string;
}

function TeamMembersTable(props: RouteComponentProps) {

  const columns: Column<TeamMember>[] = [{
    title: 'Name',
    field: 'name'
  }];

  const onClick = (e: any, r: any, t?: () => void) => props.history.push(`/users/${r.id}`);

  return (
    <>
      <MaterialTable title="Members"
                     columns={columns}
                     data={members}
                     onRowClick={onClick}
      />
    </>
  );
}

export default withRouter(TeamMembersTable);
