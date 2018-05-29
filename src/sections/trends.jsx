import React, { Component } from "react";
import { Typography, withStyles } from "@material-ui/core";

import GridItem from "components/gridItem";

import { container } from "assets/jss/main";

const trendsStyle = {
  title: {
    fontSize: "4.2rem",
    fontWeight: "600",
    display: "inline-block",
    position: "relative",
    marginBottom: "10px",
    lineHeight: "1.15em"
  }
};

class Trends extends Component {
  render() {
    const { classes } = this.props;
    return (
        <div id="trend">
            <Typography variant="display2" gutterBottom>
                Trends
            </Typography>
        </div>
    );
  }
}

export default withStyles(trendsStyle)(Trends);
