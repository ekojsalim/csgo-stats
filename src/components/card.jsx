import React from "react";
import {
  withStyles,
  Card,
  CardContent,
  CardHeader,
  CardActions,
} from "@material-ui/core";
import PropTypes from "prop-types";
import cx from "classnames";

import {
  card,
  cardHeader,
  defaultFont,
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
} from "assets/jss/main";

const regularCardStyle = {
  card,
  cardPlain: {
    background: "transparent",
    boxShadow: "none",
  },
  cardHeader: {
    ...cardHeader,
    ...defaultFont,
  },
  cardPlainHeader: {
    marginLeft: 0,
    marginRight: 0,
  },
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  cardTitle: {
    color: "#FFFFFF",
    marginTop: "0",
    marginBottom: "5px",
    ...defaultFont,
    fontSize: "1.125em",
  },
  cardSubtitle: {
    ...defaultFont,
    marginBottom: "0",
    color: "rgba(255, 255, 255, 0.62)",
    margin: "0 0 10px",
  },
  cardActions: {
    padding: "14px",
    display: "block",
    height: "auto",
  },
};

function RegularCard({...props}) {
  const {
    classes,
    headerColor,
    plainCard,
    cardTitle,
    cardSubtitle,
    content,
    footer,
  } = props;
  const plainCardClasses = cx({
    [" " + classes.cardPlain]: plainCard,
  });
  const cardPlainHeaderClasses = cx({
    [" " + classes.cardPlainHeader]: plainCard,
  });
  return (
    <Card className={classes.card + plainCardClasses}>
      <CardHeader
        classes={{
          root:
            classes.cardHeader +
            " " +
            classes[headerColor + "CardHeader"] +
            cardPlainHeaderClasses,
          title: classes.cardTitle,
          subheader: classes.cardSubtitle,
        }}
        title={cardTitle}
        subheader={cardSubtitle}
      />
      <CardContent>{content}</CardContent>
      {footer !== undefined ? (
        <CardActions className={classes.cardActions}>{footer}</CardActions>
      ) : null}
    </Card>
  );
}

RegularCard.defaultProps = {
  headerColor: "purple",
};

RegularCard.propTypes = {
  plainCard: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  headerColor: PropTypes.oneOf(["orange", "green", "red", "blue", "purple"]),
  cardTitle: PropTypes.node,
  cardSubtitle: PropTypes.node,
  content: PropTypes.node,
  footer: PropTypes.node,
};

export default withStyles(regularCardStyle)(RegularCard);
