import React, { Component } from "react";
import { Grid, withStyles, Paper, Tabs, Tab } from "@material-ui/core";

import { Phone } from "@material-ui/icons";

import cx from "classnames";

import analyze from "analyze.js";

// SECTIONS
import Head from "sections/head";
import Trends from "sections/trends";
import Stats from "sections/stats";
import MatchList from "sections/matchlist";

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
    paddingTop: "20px",
    paddingBottom: "20vh"
  },
  root: {
    flexGrow: 1
  }
});

class App extends Component {
  state = {
    value: 0,
    loading: false,
    analyzedData: {
      user: {
        id: "",
        name: "",
        average: {
          kills: 0,
          deaths: 0,
          rating: 1,
          assists: 0
        },
        total: {
          kills: 0,
          deaths: 0,
          assists: 0,
          mvps: 0
        }
      }
    }
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleData = data => {
    this.setState({
      loading: true
    });
    analyze(data).then(a => {
      console.log(a);
      this.setState({
        loading: false,
        analyzedData: a
      });
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Head dispatch={this.handleData} loading={this.state.loading} />
        <div
          className={cx(classes.main, classes.mainRaised, classes.mainPanel)}
          ref="mainPanel"
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <Stats stats={this.state.analyzedData} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <MatchList matches={this.state.analyzedData.matches}/>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(appStyle)(App);
