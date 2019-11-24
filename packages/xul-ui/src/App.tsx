import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import "./App.css";

const App: React.FC = () => {
  const classes = makeStyles(theme => ({
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  }))();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Xul Control Panel
        </Typography>
        <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" color="inherit">
          <Settings />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default App;
