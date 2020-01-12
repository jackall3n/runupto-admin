import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Checkbox } from "@material-ui/core";

export interface SimpleDialogProps {
  open: boolean;
  initialTypes: string[];
  onClose: (types: string[]) => void;
}

const options = ["Ride", "Run", "Swim", "Hike", "Walk", "Alpine Ski", "Backcountry Ski", "Canoeing", "Crossfit", "E-Bike Ride", "Elliptical", "Handcycle", "Ice Skate", "Inline Skate", "Kayaking", "Kitesurf", "Nordic Ski", "Rock Climbing", "Roller Ski", "Rowing", "Snowboard", "Snowshoe", "Stair-Stepper", "Stand Up Paddling", "Surfing", "Velomobile", "Virtual Ride", "Virtual Run", "Weight Training", "Wheelchair", "Windsurf", "Workout", "Yoga"];

function ActivityTypesDialog(props: SimpleDialogProps) {
  const { onClose, open, initialTypes } = props;
  const [types, setTypes] = React.useState(initialTypes);

  React.useEffect(() => {
    setTypes(initialTypes);
    // eslint-disable-next-line
  }, [open]);

  const handleClose = () => {
    onClose(types);
  };

  const handleListItemClick = (value: string) => {
    const nextTypes = [...types];
    const i = types.indexOf(value);
    if (i >= 0) {
      nextTypes.splice(i, 1);
    } else {
      nextTypes.push(value);
    }

    setTypes(nextTypes);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Select activity types</DialogTitle>
      <List>
        {options.map(option => (
          <ListItem button onClick={() => handleListItemClick(option)} key={option}>
            <Checkbox checked={types.indexOf(option) >= 0} />
            <ListItemText primary={option} />
          </ListItem>
        ))}

      </List>
    </Dialog>
  );
}

export default ActivityTypesDialog;
