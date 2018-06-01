import React, { Component } from "react";
import {
  Typography,
  withStyles,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@material-ui/core";

import MapTable from "sections/maptable";

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

class Trends extends Component {
  render() {
    const c = [
      { player: "Rain", rating: 1.15 },
      { player: "Karrigan", rating: 1 },
      { player: "NiKo", rating: 1.26 },
      { player: "Device", rating: 1.24 },
      { player: "S1mple", rating: 1.39 },
      { player: "Magisk", rating: 1.17 },
      { player: "gla1ve", rating: 1.06 },
      { player: "flamie", rating: 1.14 },
      { player: "electronic", rating: 1.23 },
      { player: "flusha", rating: 1.08 },
      { player: "Golden", rating: 0.96 },
      { player: "tarik", rating: 1.16 },
      { player: "autimatic", rating: 1.18 },
      { player: "Stewie2K", rating: 1.1 },
      { player: "coldzera", rating: 1.28 },
      { player: "me", rating: -1 }
    ].sort((a, b) => b.rating - a.rating);
    const { classes } = this.props;
    let stats = !this.props.stats ? ({
      user: {
        id: "",
        name: "",
        average: {
          kills: 0,
          deaths: 0,
          rating: 1,
          assists: 0
        },
        total: {
          kills: 0,
          deaths: 0,
          assists: 0,
          mvps: 0
        }
      }
    }) : this.props.stats;
    const worsePlayer = c.find(a => a.rating < stats.user.average.rating);
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
          <Grid item xs={12} sm={3} md={3}>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary">
                  Average Rating
                </Typography>
                <Typography variant="headline" component="h2">
                  {stats.user.average.rating}
                </Typography>
                <Typography component="p">
                  {`you are better than ${worsePlayer.player}(${
                    worsePlayer.rating
                  })`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {getCard("Average Kills", stats.user.average.kills)}
          {getCard("Average Assists", stats.user.average.assists)}
          {getCard("Average Deaths", stats.user.average.deaths)}
          {getCard("Total Kills", stats.user.total.kills)}
          {getCard("Total Assists", stats.user.total.assists)}
          {getCard("Total Deaths", stats.user.total.deaths)}
          {getCard("Total MVPs", stats.user.total.mvps)}
        </Grid>
        <Typography variant="display1" className={classes.heading}>Match Statistics</Typography>
        <Divider inset className={classes.divider}/>
        <Grid container spacing={16}>
        {getCard("Total Matches", !stats.matchData ? 0 : stats.matchData.totalMatch)}
        {getCard("Total Wins", !stats.matchData ? 0 : stats.matchData.totalWins)}
        {getCard("Total Losses", !stats.matchData ? 0 : stats.matchData.totalLosses)}
        {getCard("Total Draws", !stats.matchData ? 0 : stats.matchData.totalDraws)}
        {getCard("Longest Winning Streak", !stats.matchData ? 0 : stats.matchData.winStreaks)}
        {getCard("Longest Losing Streak", !stats.matchData ? 0 : stats.matchData.lossStreaks)}
        {getCard("Longest Match Duration", !stats.matchData ? 0 : `${Math.round(stats.matchData.longestMatch.asMinutes())} minutes`)}
        {getCard("Shortest Match Duration", !stats.matchData ? 0 : `${Math.round(stats.matchData.shortestMatch.asMinutes())} minutes`)}
        </Grid>
        <Typography variant="display1" className={classes.heading}>Map Statistics</Typography>
        <Divider inset className={classes.divider}/>
        <MapTable mapData={stats.mapData || {}}/>
      </div>
    );
  }
}

export default withStyles(trendsStyle)(Trends);
