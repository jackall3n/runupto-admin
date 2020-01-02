import React from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import MaterialTable, { Column } from "material-table";

function createUser(id: number, name: string) {
  return { id, name };
}

const users = [
  createUser(1, 'Jack Allen'),
  createUser(2, 'Kevin Betts'),
];

type User = {
  id: number;
  name: string;
}

function UsersTable(props: RouteComponentProps) {
  const columns: Column<User>[] = [{
    title: 'Name',
    field: 'name'
  }];

  const onRowClick = (e: any, user: User | undefined) => props.history.push(`/users/${user?.id}`);

  return (
    <>
      <MaterialTable<User> title="Users" columns={columns} data={users} onRowClick={onRowClick} />
    </>
  );
}

export default withRouter(UsersTable);
