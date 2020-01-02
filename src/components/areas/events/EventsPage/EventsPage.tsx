import React from 'react';
import EventsTable from "./components/EventsTable/EventsTable";
import Page from "../../../Page/Page";
import { Grid } from "@material-ui/core";


const active = [
  createData(1, 'Run up to Christmas', ["Run"], "01 Dec 2019", "25 Dec 2019", 65),
  createData(2, 'Swim up to Christmas', ["Run", "Swim"], "01 Dec 2019", "25 Dec 2019", 301),
];

const future = [
  createData(2, 'Easter Run', ["Run", "Swim"], "12 April 2020", "12 April 2020", 301),
]


function createData(id: number, description: string, types: string[], start: string, end: string, participants: number) {
  return { id, description, types, start, end, participants };
}


export default () => {
  return (
    <Page title='Events'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <EventsTable title="Active" events={active} />
        </Grid>
        <Grid item xs={12}>
          <EventsTable title="Future" events={future} />
        </Grid>
        <Grid item xs={12}>
          <EventsTable title="Past" events={[]} />
        </Grid>
      </Grid>
    </Page>
  )
}
