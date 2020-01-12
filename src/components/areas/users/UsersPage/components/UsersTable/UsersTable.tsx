import React from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import MaterialTable, { Column } from "material-table";
import { User } from "../../../../../../types/UserTypes";

interface Props extends RouteComponentProps {
  users: User[];
  isFetching: boolean;
}

function UsersTable({ users, history, isFetching }: Props) {
  const columns: Column<User>[] = [{
    title: 'First',
    field: 'name.first'
  },{
    title: 'Last',
    field: 'name.last',
    defaultSort: 'asc',
    customSort: ({ name: { last: last1}}, { name: { last: last2 }}) => last1.localeCompare(last2)
  }];

  const onRowClick = (e: any, user: User | undefined) => history.push(`/users/${user?.id}`);

  return (
    <>
      <MaterialTable<User> isLoading={isFetching}
                           title="Users"
                           columns={columns}
                           data={users}
                           onRowClick={onRowClick} />
    </>
  );
}

export default withRouter(UsersTable);
