import React from 'react';
import Grid from '@material-ui/core/Grid';
import Page from "../../../Page/Page";
import TeamMembersTable from "./components/TeamMembersTable/TeamMembersTable";
import TeamEventsTable from "./components/TeamEventsTable/TeamEventsTable";

export default () => {
  const team = {
    name: 'Run things'
  };

  const { name } = team;

  return (
    <Page title={`Teams / ${name}`}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TeamMembersTable />
        </Grid>
        <Grid item xs={6}>
          <TeamEventsTable />
        </Grid>
      </Grid>
    </Page>
  )
}
