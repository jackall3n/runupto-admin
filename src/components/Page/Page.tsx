import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface Props {
  title?: string;
  rightPanel?: JSX.Element;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
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
  }),
);

const Page: React.FC<Props> = ({ children, title, rightPanel }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" color='primary' style={{
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      }}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            {title}
          </Typography>
          {rightPanel}
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        {children}
      </div>
    </>
  )
};

export default Page;
