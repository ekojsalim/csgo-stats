import React, { Component } from "react";
import { Grid, withStyles, Paper, Tabs, Tab } from "@material-ui/core";

import { Phone } from "@material-ui/icons";

import cx from "classnames";

import analyze from "analyze.js";

// SECTIONS
import Head from "sections/head";
import Trends from "sections/trends";

// import "App.css";

const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    padding: "0 3vw"
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100% - 123px)"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-5vh 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    paddingTop: "20px"
  },
  root: {
    flexGrow: 1
  }
});

class App extends Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleData = data => {
    analyze(data).then((a) => console.log(a));
  };
  render() {
    const { classes } = this.props;
    console.log(classes.cardHeader);
    return (
      <div className={classes.wrapper}>
        <Head dispatch={this.handleData} />
        <div
          className={cx(classes.main, classes.mainRaised, classes.mainPanel)}
          ref="mainPanel"
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
            <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(appStyle)(App);
