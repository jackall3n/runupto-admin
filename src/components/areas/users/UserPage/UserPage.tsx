import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import UserEventsTable from "./components/UserEventsTable/UserEventsTable";
import Page from "../../../Page/Page";

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
          <Paper className={classes.paper}>

          </Paper>
        </Grid>
        <Grid item xs={6}>
          <UserEventsTable />
        </Grid>
      </Grid>
    </Page>
  )
}
