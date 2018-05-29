import React, { Component } from "react";
import { Grid, withStyles } from "@material-ui/core";

import GridItem from "components/gridItem";
import ImageHeader from "components/imageHeader";
import Button from "components/button";
import FileReaderInput from "react-file-reader-input";
import Notification from "components/notification";

import { ImportExport } from "@material-ui/icons";

import { container } from "assets/jss/main";

const headStyle = {
  title: {
    fontSize: "4.2rem",
    fontWeight: "600",
    display: "inline-block",
    position: "relative",
    marginBottom: "10px",
    lineHeight: "1.15em"
  },
  subtitle: {
    fontSize: "1.2rem",
    maxWidth: "500px",
    margin: "10px 0"
  },
  containerTitle: {
    ...container,
    width: "100%"
  },
  brand: {
    color: "#FFFFFF",
    textAlign: "left"
  },
  buttonImport: {
    padding: "8px 16px"
  }
};

class Head extends Component {
    state = {
        showNotif: false,
        message: ""
    }

  getFile = (e, results) => {
    results.forEach(result => {
      const [e, file] = result;
      console.log("Data successfully imported!");
      this.setState({showNotif: true, message:"Data successfully imported!"});
      this.props.dispatch(JSON.parse(e.target.result));
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <ImageHeader image={"http://i.imgur.com/5NNc5U4.jpg"}>
      {this.state.showNotif ? <Notification message={this.state.message}/> : ""}
        <div className={classes.containerTitle}>
          <Grid container>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Matchmaking Analysis</h1>
                <h3 className={classes.subtitle}>
                  Import your matchmaking data to start, get your data using this script.
                </h3>
                <FileReaderInput as="text" onChange={this.getFile}>
                  <Button
                    type="button"
                    color="danger"
                    className={classes.buttonImport}
                  >
                    <ImportExport />
                    <span>IMPORT</span>
                  </Button>
                </FileReaderInput>
              </div>
            </GridItem>
          </Grid>
        </div>
      </ImageHeader>
    );
  }
}

export default withStyles(headStyle)(Head);
