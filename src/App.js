import React, { Component } from "react";
import { Grid, withStyles } from "@material-ui/core";

import cx from "classnames";

import analyze from "analyze.js";

// SECTIONS
import Head from "sections/head";
import Stats from "sections/stats";
import MatchList from "sections/matchlist";
import BanStats from "sections/banStats";

import ApiDialog from "components/apiDialog";

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
    showDialog: false,
    showConfirm: !!localStorage.getItem("apiKey"),
    showInput: !localStorage.getItem("apiKey"),
    analyzedData: {},
    rawData: {}
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleData = data => {
    this.setState({
      showDialog: true,
      rawData: data
    });
  };
  handleDialog = obj => {
    let key = "";
    if (obj.newKey) {
      key = obj.key;
      localStorage.setItem("apiKey", obj.key);
      this.setState({ showInput: false, showConfirm: true, showDialog: false });
    } else {
      if (!obj.getNew)
        this.setState({
          showConfirm: true,
          showInput: false,
          showDialog: false
        });
      if (obj.getNew) {
        return this.setState({
          showConfirm: false,
          showInput: true,
          showDialog: true
        });
      }
      key = this.state.APIKey;
    }
    this.setState({ loading: true });
    const z = key ? analyze(this.state.rawData, key) : analyze(this.state.rawData);
    z.then(a => {
      console.log(a);
      this.setState({
        loading: false,
        analyzedData: a,
        rawData: {}
      });
    });
  };
  render() {
    const { classes } = this.props;
    const {
      analyzedData,
      APIKey,
      showDialog,
      loading,
      showConfirm,
      showInput
    } = this.state;
    return (
      <div className={classes.wrapper}>
        <Head dispatch={this.handleData} loading={loading} />
        <ApiDialog
          hasAPIKey={!!APIKey}
          showConfirm={showDialog && showConfirm}
          showInput={showDialog && showInput}
          dialogEnd={this.handleDialog}
        />
        <div
          className={cx(classes.main, classes.mainRaised, classes.mainPanel)}
          ref="mainPanel"
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <Stats stats={analyzedData.user && analyzedData} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <BanStats banData={analyzedData.user && analyzedData.banStats} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <MatchList
                matchesData={analyzedData.matches ? analyzedData.matches : []}
                userMatchesData={
                  analyzedData.user ? analyzedData.user.matches : []
                }
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(appStyle)(App);
