import React from "react";
import { withStyles, Button } from "@material-ui/core";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";

import {
    grayColor,
    roseColor,
    primaryColor,
    infoColor,
    successColor,
    warningColor,
    dangerColor
  } from "assets/jss/main";
  
  const buttonStyle = {
    button: {
      minHeight: "auto",
      minWidth: "auto",
      backgroundColor: grayColor,
      color: "#FFFFFF",
      boxShadow:
        "0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)",
      border: "none",
      borderRadius: "2px",
      position: "relative",
      padding: "12px 30px",
      margin: "10px 1px",
      fontSize: "0.875rem",
      fontWeight: "400",
      textTransform: "uppercase",
      letterSpacing: "0",
      willChange: "box-shadow, transform",
      transition:
        "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      lineHeight: "1.42857143",
      textAlign: "center",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
      touchAction: "manipulation",
      cursor: "pointer",
      "&:hover,&:focus": {
        color: "#FFFFFF",
        backgroundColor: grayColor,
        boxShadow:
          "0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(153, 153, 153, 0.2)"
      }
    },
    fullWidth: {
      width: "100%"
    },
    primary: {
      backgroundColor: primaryColor,
      boxShadow:
        "0 2px 2px 0 rgba(156, 39, 176, 0.14), 0 3px 1px -2px rgba(156, 39, 176, 0.2), 0 1px 5px 0 rgba(156, 39, 176, 0.12)",
      "&:hover,&:focus": {
        backgroundColor: primaryColor,
        boxShadow:
          "0 14px 26px -12px rgba(156, 39, 176, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(156, 39, 176, 0.2)"
      }
    },
    info: {
      backgroundColor: infoColor,
      boxShadow:
        "0 2px 2px 0 rgba(0, 188, 212, 0.14), 0 3px 1px -2px rgba(0, 188, 212, 0.2), 0 1px 5px 0 rgba(0, 188, 212, 0.12)",
      "&:hover,&:focus": {
        backgroundColor: infoColor,
        boxShadow:
          "0 14px 26px -12px rgba(0, 188, 212, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 188, 212, 0.2)"
      }
    },
    success: {
      backgroundColor: successColor,
      boxShadow:
        "0 2px 2px 0 rgba(76, 175, 80, 0.14), 0 3px 1px -2px rgba(76, 175, 80, 0.2), 0 1px 5px 0 rgba(76, 175, 80, 0.12)",
      "&:hover,&:focus": {
        backgroundColor: successColor,
        boxShadow:
          "0 14px 26px -12px rgba(76, 175, 80, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(76, 175, 80, 0.2)"
      }
    },
    warning: {
      backgroundColor: warningColor,
      boxShadow:
        "0 2px 2px 0 rgba(255, 152, 0, 0.14), 0 3px 1px -2px rgba(255, 152, 0, 0.2), 0 1px 5px 0 rgba(255, 152, 0, 0.12)",
      "&:hover,&:focus": {
        backgroundColor: warningColor,
        boxShadow:
          "0 14px 26px -12px rgba(255, 152, 0, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(255, 152, 0, 0.2)"
      }
    },
    danger: {
      backgroundColor: dangerColor,
      boxShadow:
        "0 2px 2px 0 rgba(244, 67, 54, 0.14), 0 3px 1px -2px rgba(244, 67, 54, 0.2), 0 1px 5px 0 rgba(244, 67, 54, 0.12)",
      "&:hover,&:focus": {
        backgroundColor: dangerColor,
        boxShadow:
          "0 14px 26px -12px rgba(244, 67, 54, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(244, 67, 54, 0.2)"
      }
    },
    rose: {
      backgroundColor: roseColor,
      boxShadow:
        "0 2px 2px 0 rgba(233, 30, 99, 0.14), 0 3px 1px -2px rgba(233, 30, 99, 0.2), 0 1px 5px 0 rgba(233, 30, 99, 0.12)",
      "&:hover,&:focus": {
        backgroundColor: roseColor,
        boxShadow:
          "0 14px 26px -12px rgba(233, 30, 99, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(233, 30, 99, 0.2)"
      }
    },
    white: {
      "&,&:focus,&:hover": {
        backgroundColor: "#FFFFFF",
        color: grayColor
      }
    },
    facebook: {
      backgroundColor: "#3b5998",
      color: "#fff",
      boxShadow:
        "0 2px 2px 0 rgba(59, 89, 152, 0.14), 0 3px 1px -2px rgba(59, 89, 152, 0.2), 0 1px 5px 0 rgba(59, 89, 152, 0.12)",
      "&:hover,&:focus": {
        backgroundColor: "#3b5998",
        color: "#fff",
        boxShadow:
          "0 14px 26px -12px rgba(59, 89, 152, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(59, 89, 152, 0.2)"
      }
    },
    twitter: {
      backgroundColor: "#55acee",
      color: "#fff",
      boxShadow:
        "0 2px 2px 0 rgba(85, 172, 238, 0.14), 0 3px 1px -2px rgba(85, 172, 238, 0.2), 0 1px 5px 0 rgba(85, 172, 238, 0.12)",
      "&:hover,&:focus": {
        backgroundColor: "#55acee",
        color: "#fff",
        boxShadow:
          "0 14px 26px -12px rgba(85, 172, 238, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(85, 172, 238, 0.2)"
      }
    },
    google: {
      backgroundColor: "#dd4b39",
      color: "#fff",
      boxShadow:
        "0 2px 2px 0 rgba(221, 75, 57, 0.14), 0 3px 1px -2px rgba(221, 75, 57, 0.2), 0 1px 5px 0 rgba(221, 75, 57, 0.12)",
      "&:hover,&:focus": {
        backgroundColor: "#dd4b39",
        color: "#fff",
        boxShadow:
          "0 14px 26px -12px rgba(221, 75, 57, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(221, 75, 57, 0.2)"
      }
    },
    github: {
      backgroundColor: "#333333",
      color: "#fff",
      boxShadow:
        "0 2px 2px 0 rgba(51, 51, 51, 0.14), 0 3px 1px -2px rgba(51, 51, 51, 0.2), 0 1px 5px 0 rgba(51, 51, 51, 0.12)",
      "&:hover,&:focus": {
        backgroundColor: "#333333",
        color: "#fff",
        boxShadow:
          "0 14px 26px -12px rgba(51, 51, 51, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(51, 51, 51, 0.2)"
      }
    },
    simple: {
      "&,&:focus,&:hover": {
        color: "#FFFFFF",
        background: "transparent",
        boxShadow: "none"
      },
      "&$primary": {
        "&,&:focus,&:hover": {
          color: primaryColor
        }
      },
      "&$info": {
        "&,&:focus,&:hover": {
          color: infoColor
        }
      },
      "&$success": {
        "&,&:focus,&:hover": {
          color: successColor
        }
      },
      "&$warning": {
        "&,&:focus,&:hover": {
          color: warningColor
        }
      },
      "&$rose": {
        "&,&:focus,&:hover": {
          color: roseColor
        }
      },
      "&$danger": {
        "&,&:focus,&:hover": {
          color: dangerColor
        }
      },
      "&$facebook": {
        "&,&:focus,&:hover": {
          color: "#3b5998"
        }
      },
      "&$twitter": {
        "&,&:focus,&:hover": {
          color: "#55acee"
        }
      },
      "&$google": {
        "&,&:focus,&:hover": {
          color: "#dd4b39"
        }
      },
      "&$github": {
        "&,&:focus,&:hover": {
          color: "#333333"
        }
      }
    },
    transparent: {
      "&,&:focus,&:hover": {
        color: "inherit",
        background: "transparent",
        boxShadow: "none"
      }
    },
    round: {
      borderRadius: "30px"
    },
    disabled: {
      opacity: "0.65",
      pointerEvents: "none"
    },
    lg: {
      padding: "1.125rem 2.25rem",
      fontSize: "0.875rem",
      lineHeight: "1.333333",
      borderRadius: "0.2rem"
    },
    sm: {
      padding: "0.40625rem 1.25rem",
      fontSize: "0.6875rem",
      lineHeight: "1.5",
      borderRadius: "0.2rem"
    },
    block: {
      width: "100% !important"
    },
    link: {
      "&,&:hover,&:focus": {
        backgroundColor: "transparent",
        color: "#999999",
        boxShadow: "none"
      }
    },
    justIcon: {
      minWidth: "10px",
      paddingLeft: "12px",
      paddingRight: "12px",
      fontSize: "20px"
    }
  };

function RegularButton({ ...props }) {
  const {
    classes,
    color,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    ...rest
  } = props;
  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className
  });
  return (
    <Button {...rest} className={btnClasses}>
      {children}
    </Button>
  );
}

RegularButton.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "white",
    "facebook",
    "twitter",
    "google",
    "github",
    "transparent"
  ]),
  size: PropTypes.oneOf(["sm", "lg"]),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool
};

export default withStyles(buttonStyle)(RegularButton);
