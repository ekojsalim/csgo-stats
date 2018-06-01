import React, { Component } from "react";
// material-ui components
import { withStyles } from "@material-ui/core";

const parallaxStyle = {
    image: {
      height: "90vh",
      overflow: "hidden",
      position: "relative",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      margin: "0",
      padding: "0",
      border: "0",
      display: "flex",
      alignItems: "center"
    }
  };

class ImageHeader extends Component {
    render() {
        const { classes, children, image} = this.props;
        return (
          <div
            className={classes.image}
            style={{
              backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${image})`
            }}
          >
            {children}
          </div>
        );
    }
  }

export default withStyles(parallaxStyle)(ImageHeader);
