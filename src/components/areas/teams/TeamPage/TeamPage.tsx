import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Page from "../../../Page/Page";
import TeamMembersTable from "./components/TeamMembersTable/TeamMembersTable";
import TeamEventsTable from "./components/TeamEventsTable/TeamEventsTable";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  }),
);

export default () => {
  const classes = useStyles();
  const team = {
    name: 'Run things'
  };

  const { name } = team;

  return (
    <Page title={name}>
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
