import React from 'react';

import { Route, Switch } from "react-router-dom";
import EventsRoute from '../areas/events/EventsRoute';
import UsersRoute from "../areas/users/UsersRoute";
import TeamsRoute from "../areas/teams/TeamsRoute";

export default function Routes() {
  return (
    <Switch>
      <Route path='/events' component={EventsRoute} />
      <Route path='/users' component={UsersRoute} />
      <Route path='/teams' component={TeamsRoute} />
    </Switch>
  );
};
