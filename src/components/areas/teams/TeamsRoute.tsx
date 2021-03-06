import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import TeamPage from "./TeamPage/TeamPage";
import TeamsPage from "./TeamsPage/TeamsPage";

export default function TeamsRoute({ match }: RouteComponentProps) {
  return (
    <Switch>
      <Route path={match.path} exact component={TeamsPage} />
      <Route path={`${match.path}/:id`} component={TeamPage} />
    </Switch>
  )
}
