import React from 'react';
import MaterialTable, { Column } from "material-table";
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface Props extends RouteComponentProps {
  edit?: boolean;
}

function createData(id: number, description: string, distance: number): EventVariant {
  return { id, description, distance };
}

const rows = [
  createData(1, '100k', 100),
  createData(2, '75k', 75),
  createData(3, '50k', 50),
  createData(4, '25k', 25),
  createData(5, '10k', 10),
];

type EventVariant = {
  id: number;
  description: string;
  distance: number;
}

function EventVariantsTable(props: Props) {
  const [data, setData] = React.useState<EventVariant[]>(rows);

  const columns: Column<EventVariant>[] = [
    {
      title: "Description",
      field: "description"
    },
    {
      title: 'Distance',
      type: 'numeric',
      field: 'distance'
    }
  ];

  const editable = props.edit ? {
    onRowAdd(newData: EventVariant) {
      setData([...data, { ...newData, id: 4 }]);
      return Promise.resolve();
    },
    onRowUpdate(editData: EventVariant) {
      const nextData = [...data];
      nextData[nextData.findIndex(d => d.id === editData.id)] = editData;
      setData(nextData);
      return Promise.resolve();
    },
    onRowDelete(editData: EventVariant) {
      const nextData = [...data];
      nextData.splice(nextData.findIndex(d => d.id === editData.id), 1);
      setData(nextData);
      return Promise.resolve();
    }
  } : undefined;

  return (
    <>
      <MaterialTable
        options={{ search: false, paging: false }}
        editable={editable}
        title="Variants"
        columns={columns}
        data={data}
      />
    </>
  );
}

export default withRouter(EventVariantsTable);
