import React, { Component } from "react";
import { Grid, withStyles } from "@material-ui/core";

import cx from "classnames";

import Table from "components/table";
import Card from "components/card";
import GridItem from "components/gridItem";
import ImageHeader from "components/imageHeader";

import { transition, container, } from "assets/jss/main";

import "App.css";

const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch"
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100% - 123px)"
  },
  brand: {
    color: "#FFFFFF",
    textAlign: "left"
  },
  title: {
    fontSize: "4.2rem",
    fontWeight: "600",
    display: "inline-block",
    position: "relative",
    marginBottom: "10px",
    lineHeight: "1.15em"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px 0 30px"
  },
  containerTitle : {
    ...container,
    width: "100%"
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
    paddingTop: "90px"
  },
});

class App extends Component {
  render() {
    const { classes, ...rest } = this.props;
    console.log(classes.cardHeader)
    return (
      <div className={classes.wrapper}>
        <ImageHeader image={"http://i.imgur.com/5NNc5U4.jpg"}>
          <div className={classes.containerTitle}>
            <Grid container>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title}>CSGO MM Analyzer</h1>
                  <h3 className={classes.subtitle}>
                    Analyze your GDPR Valve Matchmaking data.
                  </h3>
                </div>
              </GridItem>
            </Grid>
          </div>
        </ImageHeader>
        <div className={cx(classes.main, classes.mainRaised)} ref="mainPanel">
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
