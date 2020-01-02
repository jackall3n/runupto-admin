import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import EventsPage from "./EventsPage/EventsPage";
import EventPage from "./EventPage/EventPage";

export default function EventsRoute({ match }: RouteComponentProps) {
  return (
    <Switch>
      <Route path={match.path} exact component={EventsPage} />
      <Route path={`${match.path}/:id`} component={EventPage} />
    </Switch>
  )
}
