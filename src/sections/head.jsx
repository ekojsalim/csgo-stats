import React, { Component } from "react";
import { Grid, withStyles, Typography, CircularProgress } from "@material-ui/core";

import ImageHeader from "components/imageHeader";
import Button from "@material-ui/core/Button";
import FileReaderInput from "react-file-reader-input";
import Notification from "components/notification";

import green from "@material-ui/core/colors/green";

import { ImportExport } from "@material-ui/icons";

import { container } from "assets/jss/main";

const headStyle = theme => ({
  title: {
    // fontSize: "4.2rem",
    // fontWeight: "600",
    // display: "inline-block",
    // position: "relative",
    // marginBottom: "10px",
    // lineHeight: "1.15em"
    color: "white",
    textTransform: "uppercase",
    letterSpacing: "0.55rem",
    marginBottom: "1vh"
  },
  subtitle: {
    // fontSize: "1.2rem",
    // maxWidth: "500px",
    // margin: "10px 0"
    color: "white",
    fontWeight: 300
  },
  containerTitle: {
    ...container,
    width: "100%"
  },
  brand: {
    color: "#FFFFFF",
  },
  buttonImport: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  gridContainer: {
    textAlign: "center"
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});

class Head extends Component {
    state = {
        showNotif: false,
        message: "",
    }

  getFile = (e, results) => {
    results.forEach(result => {
      const [e, file] = result;
      console.log("Data successfully imported!");
      this.setState({showNotif: true, message:"Analyzing data! Please be patient."});
      this.props.dispatch(JSON.parse(e.target.result));
    });
  };
  render() {
    const { classes, loading } = this.props;
    return (
      <ImageHeader image={"http://i.imgur.com/5NNc5U4.jpg"}>
      {loading && <Notification message={this.state.message}/>}
        <div className={classes.containerTitle}>
          <Grid container justify="center" className={classes.gridContainer}>
            <Grid item>
              <div className={classes.brand}>
                <Typography variant="display2" className={classes.title}>Matchmaking Analysis</Typography>
                <Typography variant="title" className={classes.subtitle} gutterBottom>
                  Import your matchmaking data to start, get your data using this script.
                </Typography>
                <FileReaderInput as="text" onChange={this.getFile}>
                  <Button
                    variant="raised"
                    color="secondary"
                    disabled={loading}
                    className={classes.buttonImport}
                  >
                    IMPORT<ImportExport className={classes.rightIcon} />
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </Button>
                </FileReaderInput>
              </div>
            </Grid>
          </Grid>
        </div>
      </ImageHeader>
    );
  }
}

export default withStyles(headStyle)(Head);
