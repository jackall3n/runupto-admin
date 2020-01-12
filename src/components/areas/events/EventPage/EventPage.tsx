import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ParticipantsTable from "./components/ParticipantsTable/ParticipantsTable";
import Chip from "@material-ui/core/Chip";
import Page from "../../../Page/Page";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import EventVariantsTable from "./components/EventVariantsTable/EventVariantsTable";
import Switch from "@material-ui/core/Switch";
import { Button } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import { KeyboardDatePicker } from "@material-ui/pickers";
import AddIcon from "@material-ui/icons/Add";
import ActivityTypesDialog from "./components/ActivityTypesDialog/ActivityTypesDialog";
import { connect } from "react-redux";
import { Event } from '../../../../types/EventTypes';
import { AppState } from "../../../../types/StoreTypes";
import { RouteComponentProps } from 'react-router-dom';
import { getEventSelector } from "../../../../selectors/eventSelectors";
import { fetchIfNeeded } from "../../../../actions/eventActions";

interface OwnProps extends RouteComponentProps<{ id: string }> {
  event?: Event;
}

interface Props extends OwnProps {
  actions: {
    events: {
      fetchIfNeeded(): void;
    }
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    datum: {
      padding: theme.spacing(2),
      display: 'flex'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center'
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    activityTypeChips: {
      flexWrap: 'wrap'
    },
    chipAdd: {
      display: 'flex',
      flexShrink: 0,
    }
  }),
);

function EventPage({ event, actions, }: Props) {

  useEffect(() => {
    actions.events.fetchIfNeeded();
    // eslint-disable-next-line
  }, []);

  console.log(event);
  const classes = useStyles();
  const [edit, setEdit] = React.useState<boolean>(false);
  const [editTypes, setEditTypes] = React.useState<boolean>(false);

  const [, setEvent] = React.useState<{ name: string, types: string[], start: string, end: string }>({
    name: 'Run up to Christmas',
    types: ['Run', 'Swim'],
    start: '01 Dec 2019',
    end: '25 Dec 2019'
  });

  if (!event) {
    return null;
  }

  const { description, activity_types, duration: { start, end } } = event.summary;


  const RightPanel = () => {
    return (
      <>
        <Switch checked={edit} onChange={(event1, checked) => setEdit(checked)} />
        <Button variant="contained" onClick={() => setEdit(false)}>Save</Button>
      </>
    )
  };

  const ChipAdd = () => (
    <IconButton size='small' className={classes.chipAdd} onClick={() => setEditTypes(true)}>
      <AddIcon />
    </IconButton>
  );

  const onDeleteType = (value: string) => {
    const nextTypes = [...activity_types];

    const i = nextTypes.indexOf(value);
    if (i < 0) {
      return;
    }

    nextTypes.splice(i, 1);

    setEvent(event => ({
      ...event,
      types: nextTypes
    }))
  };

  const updateEvent = (e: any) => setEvent(event => ({ ...event, ...e }));

  return (
    <Page title={`Events / ${description}`} rightPanel={<RightPanel />}>
      <ActivityTypesDialog open={editTypes} onClose={(t) => {
        setEvent(event => ({ ...event, types: t }));
        setEditTypes(false);
      }}
                           initialTypes={activity_types} />

      <div>
        <Grid container spacing={3}>
          <Grid item sm={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper>
                  <div className={classes.datum}>
                    <Typography className={classes.heading}>Name</Typography>
                    {edit ? <Input value={description} onChange={({ target: { value } }) => setEvent(event => ({
                      ...event,
                      description: value
                    }))} /> : <Typography className={classes.secondaryHeading}>{description}</Typography>}
                  </div>
                  <Divider />
                  <div className={classes.datum}>
                    <Typography className={classes.heading}>Activity Types</Typography>
                    <div className={classes.chips}>
                      {activity_types.map(value => (
                        <Chip key={value} label={value} className={classes.chip}
                              onDelete={edit ? () => onDeleteType(value) : undefined} />
                      ))}</div>
                    {edit ? <ChipAdd /> : undefined}
                  </div>
                  <Divider />
                  <div className={classes.datum}>
                    <Typography className={classes.heading}>Start</Typography>
                    {edit ? <KeyboardDatePicker
                      margin="normal"
                      label="Date picker dialog"
                      format="dd MMM yyyy"
                      value={start}
                      onChange={(target) => updateEvent({
                        start: target
                      })}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    /> : <Typography className={classes.secondaryHeading}>{start.toLocaleDateString("en-GB", {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric'
                    })}</Typography>}
                  </div>
                  <Divider />
                  <div className={classes.datum}>
                    <Typography className={classes.heading}>End</Typography>
                    {edit ? <KeyboardDatePicker
                      margin="normal"
                      label="Date picker dialog"
                      format="dd MMM yyyy"
                      value={end}
                      onChange={(target) => updateEvent({
                        end: target
                      })}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    /> : <Typography className={classes.secondaryHeading}>{end.toLocaleDateString("en-GB", {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric'
                    })}</Typography>}
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <EventVariantsTable edit={edit} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} md={6}>
            <ParticipantsTable />
          </Grid>
        </Grid>
      </div>
    </Page>
  )
}

const mapStateToProps = (state: AppState, props: OwnProps) => {
  const { id } = props.match.params;

  return {
    event: getEventSelector(state, id)
  }
};

const mapDispatchToProps = (dispatch: any) => ({
  actions: {
    events: {
      fetchIfNeeded: () => dispatch(fetchIfNeeded())
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
