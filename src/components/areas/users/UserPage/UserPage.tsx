import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UserEventsTable from "./components/UserEventsTable/UserEventsTable";
import Page from "../../../Page/Page";
import UserTeamsTable from "./components/UserTeamsTable/UserTeamsTable";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  }),
);

export default () => {
  const classes = useStyles();
  const user = {
    name: 'Jack Allen'
  };


  const { name } = user;

  return (
    <Page title={name}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <UserEventsTable />
        </Grid>
        <Grid item xs={6}>
          <UserTeamsTable />
        </Grid>
      </Grid>
    </Page>
  )
}
