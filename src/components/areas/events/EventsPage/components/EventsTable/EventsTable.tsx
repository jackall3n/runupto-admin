import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { RouteComponentProps, withRouter } from "react-router-dom";
import MaterialTable, { Column } from "material-table";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import DateFnsUtils from '@date-io/date-fns';
import { Event } from '../../../../../../types/EventTypes';

const dateFns = new DateFnsUtils();

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  types: {
    '& > *': {
      marginRight: theme.spacing(0.5)
    },
  }
}));

/*
* Events require us to set them up at any point, and the back end allowing us to be in charge of a range of
* variables such as distance, duration, cost, team creation (including our ability to edit teams).
* Needs to be dynamic enough for mid-event changes to people’s targets or team memberships. Should also
* allow us to select which types of activity to pull through from strava. And needs a ‘manual upload’
* option for people to submit evidence without strava.
*
* Live dashboard of stats would be great. How far in total, who’s completed etc.
* */

const options = [
  'View',
  'Edit',
  'Duplicate',
  'Delete'
];

const ITEM_HEIGHT = 48;

interface Props extends RouteComponentProps {
  title: string;
  events?: Event[];
  isFetching?: boolean;
}

function EventsTable({ title, events = [], isFetching, history }: Props) {
  const classes = useStyles();

  const columns: Column<Event>[] = [{
    title: 'Description',
    field: 'summary.description'
  }, {
    title: 'Types',
    render: ({ summary: { activity_types } }) => (
      <div className={classes.types}>
        {activity_types.map(type => <Chip key={type} size="small" label={type} />)}
      </div>
    )
  }, {
    title: 'Start',
    render: ({ summary: { duration } }) => dateFns.format(dateFns.date(duration.start), 'dd MMM yyyy')
  }, {
    title: 'End',
    render: ({ summary: { duration } }) => dateFns.format(dateFns.date(duration.end), 'dd MMM yyyy')
  }, {
    title: 'Participants',
    type: 'numeric',
    field: 'summary.participants.length'
  }];

  const onRowClick = (e: any, event: Event | undefined) => history.push(`/events/${event?.id}`);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MaterialTable<Event> isLoading={isFetching} localization={{
        body: {
          emptyDataSourceMessage: 'There is nothing to display'
        }
      }} options={{ showEmptyDataSourceMessage: true, actionsColumnIndex: -1 }}
                            actions={[{
                              icon: () => <MoreVertIcon aria-controls="long-menu" />,
                              tooltip: 'Options',
                              onClick: handleClick
                            }]} title={title} columns={columns} data={events}
                            onRowClick={onRowClick} />
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        {options.map(option => (
          <MenuItem key={option} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default withRouter(EventsTable);
