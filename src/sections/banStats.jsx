import React, { Component } from "react";
import {
  Typography,
  withStyles,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@material-ui/core";

const trendsStyle = {
  card: {
    minHeight: "16vh"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  heading: {
      marginTop: "12px"
  },
  divider: {
      margin: "12px 0",
  }
};

class Ban extends Component {
  render() {
    const { classes } = this.props;
    let banData = this.props.banData || {};
    function getCard(title, stat) {
        return (<Grid item xs={12} sm={3} md={3}>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary">
                  {title}
                </Typography>
                <Typography variant="headline" component="h2">
                  {stat}
                </Typography>
              </CardContent>
            </Card>
          </Grid>);
    }
    return (
      <div id="stats">
        <Typography variant="display1" className={classes.heading}>Player Statistics</Typography>
        <Divider inset className={classes.divider}/>
        <Grid container spacing={16}>
          {getCard("Cheaters encountered", banData.cheaterEncountered || 0)}
          {getCard("Match with cheaters", banData.numMatchWithCheaters || 0)}
          {getCard("Winrate against cheaters", banData.againstCheater ? `${Math.round((banData.againstCheater.wins/banData.againstCheater.matches)*100) || 0} %` : 0)}
          {getCard("Winrate with cheaters", banData.againstCheater ? `${Math.round((banData.withCheater.wins/banData.withCheater.matches)*100) || 0} %` : 0)}
        </Grid>
      </div>
    );
  }
}

export default withStyles(trendsStyle)(Ban);
