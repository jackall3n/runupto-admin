import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import UsersPage from "./UsersPage/UsersPage";
import UserPage from "./UserPage/UserPage";

export default function UsersRoute({ match }: RouteComponentProps) {
  return (
    <Switch>
      <Route path={match.path} exact component={UsersPage} />
      <Route path={`${match.path}/:id`} component={UserPage} />
    </Switch>
  )
}
