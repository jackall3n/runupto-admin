import React from 'react';
import { Checkbox } from "@material-ui/core";
import MaterialTable, { Column } from "material-table";
import { RouteComponentProps, withRouter } from 'react-router-dom';

function createData(id: number, name: string, progress: number, goal: number, completed: boolean): Participant {
  return { id, name, progress, goal, completed };
}

const rows = [
  createData(1, 'Jack Allen', 35, 100, false),
  createData(2, 'Kevin Betts', 86, 100, false),
  createData(3, 'Scarlett Anderson-Salewski', 103, 100, true),
];

/*
* Events require us to set them up at any point, and the back end allowing us to be in charge of a range of
* variables such as distance, duration, cost, team creation (including our ability to edit teams).
* Needs to be dynamic enough for mid-event changes to people’s targets or team memberships. Should also
* allow us to select which types of activity to pull through from strava. And needs a ‘manual upload’
* option for people to submit evidence without strava.
*
* Live dashboard of stats would be great. How far in total, who’s completed etc.
* */

type Participant = {
  id: number;
  name: string;
  progress: number;
  goal: number;
  completed: boolean;
}


function ParticipantsTable(props: RouteComponentProps) {
  const columns: Column<Participant>[] = [
    {
      title: "Name",
      field: "name"
    },
    {
      title: 'Distance',
      type: 'numeric',
      render: data => {
        return `${data.progress} / ${data.goal}`
      }
    },
    {
      title: 'Completed',
      type: 'numeric',
      render: data => <Checkbox size='small' disabled checked={data.completed} />
    }
  ];

  return (
    <>
      <MaterialTable title="Participants" columns={columns} data={rows} onRowClick={(event, row) => {
        if (row) {
          props.history.push(`/users/${row.id}`)
        }
      }
      } />
    </>
  );
}

export default withRouter(ParticipantsTable);
