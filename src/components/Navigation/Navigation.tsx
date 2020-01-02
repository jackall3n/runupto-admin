import React from 'react';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { Typography } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: {
      ...theme.mixins.toolbar,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex'
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    navItem: {
      '&:visited, &:active' : {
        color: 'black',
        textDecoration: 'none'
      }
    }
  }),
);

const createRoute = (name: string, path: string, icon: JSX.Element) => ({ name, path, icon });

const routes = [
  createRoute('Events', '/events', <DateRangeIcon />),
  createRoute('Users', '/users', <PersonIcon />),
  createRoute('Teams', '/teams', <PeopleIcon />)
];

const Navigation = () => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar}>
        <Typography variant="h6">
          Zorp Admin
        </Typography>
      </div>
      <Divider />
      <List>
        {routes.map((route) => (
          <NavLink to={route.path} key={route.path} className={classes.navItem}>
            <ListItem button>
              <ListItemIcon>
                {route.icon}
              </ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Drawer>
  )
};

export default Navigation;
