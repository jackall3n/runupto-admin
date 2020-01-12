import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useMenu } from "../../contexts/MenuContext";

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
    appBar: {
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    }
  }),
);

const Page: React.FC<Props> = ({ children, title, rightPanel }) => {
  const classes = useStyles();

  const { toggleMenu } = useMenu();

  return (
    <>
      <AppBar position="fixed" color='primary' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className={classes.menuButton}
            onClick={() => toggleMenu(true)}
          >
            <MenuIcon />
          </IconButton>
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
