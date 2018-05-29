import React, { Component } from "react";
import { Grid, withStyles } from "@material-ui/core";

import cx from "classnames";

import Table from "components/table";
import Card from "components/card";
import GridItem from "components/gridItem";

// SECTIONS
import Head from "sections/head";
import Trends from "sections/trends";

import { transition } from "assets/jss/main";

import "App.css";

const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    ...transition,
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
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    paddingTop: "20px"
  },
});

class App extends Component {
  handleData = (data) => {
    console.log("success");
  }
  render() {
    const { classes } = this.props;
    console.log(classes.cardHeader)
    return (
      <div className={classes.wrapper}>
        <Head dispatch={this.handleData}/>
        <div className={cx(classes.main, classes.mainRaised, classes.mainPanel)} ref="mainPanel">
          <Trends />
          <Grid container>
            <GridItem
              xs={12}
              sm={12}
              md={12}
            >
              <Card
                plainCard
                cardTitle="Match Data"
                cardSubtitle="Test"
                content={
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["Name", "Country", "City", "Salary"]}
                    tableData={[
                      ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                      ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                      ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                      [
                        "Philip Chaney",
                        "Korea, South",
                        "Overland Park",
                        "$38,735"
                      ],
                      [
                        "Doris Greene",
                        "Malawi",
                        "Feldkirchen in Kärnten",
                        "$63,542"
                      ],
                      ["Mason Porter", "Chile", "Gloucester", "$78,615"]
                    ]}
                  />
                }
              />
            </GridItem>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(appStyle)(App);
