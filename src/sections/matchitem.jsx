import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  Divider,
  Chip,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardMedia
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import PlayerTable from "sections/playerTable";

const styles = theme => ({
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    flexBasis: "60%",
    flexShrink: 0,
    flexWrap: "wrap"
  },
  headline: {
    marginTop: "12px"
  },
  divider: {
    margin: "12px 0"
  },
  chip: {
    margin: `0 ${theme.spacing.unit}px`,
    padding: "0 !important"
  },
  summary: {
    "@media (max-width: 500px)": {
      flexWrap: "wrap"
    }
  },
  chipContainer: {
    flexBasis: "40%",
    textAlign: "right"
  },
  steamLink: {
    textDecoration: "none",
    color: "rgba(0, 0, 0, 0.87)"
  },
  bannedChips: {
    backgroundColor: "#B2DFDB"
  },
  chipWin: {
    backgroundColor: "#81C784"
  },
  chipLoss: {
    backgroundColor: "#FFB74D"
  },
  card: {
    display: "flex",
    marginBottom: "20px"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flex: "1 0 auto"
  },
  content: {
    flex: "1 1 auto"
  },
  cover: {
    flex: "4 0 0",
    width: "100%"
  },
  containerParent: {
    flexWrap: "wrap"
  },
  scoreText: {
    wordSpacing: "0.2rem"
  },
  chipReplay: {
    backgroundColor: "#A5D6A7"
  },
  replayLink: {
    color: "rgba(0, 0, 0, 0.87)",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  input: {
    margin: theme.spacing.unit
  },
  matchesText: {
    margin: theme.spacing.unit
  },
  defaultMargin: {
    margin: theme.spacing.unit
  }
});

class SimpleExpansionPanel extends React.Component {
  state = {
    show: false
  };
  handleShow = () => {
    this.setState({ show: !this.state.show });
  };
  render() {
    const { classes, matchData, userMatchData } = this.props;
    function resolveMap(map) {
      const path = "image/";
      const linkMap = {
        Inferno: path + "inferno.jpg",
        Mirage: path + "mirage.jpg",
        Cobblestone: path + "cobblestone.jpg",
        Overpass: path + "overpass.jpg",
        Cache: path + "cache.jpg",
        Train: path + "train.jpg",
        Nuke: path + "nuke.jpg",
        Dust: path + "dust2.jpg"
      };
      return linkMap[map] || path + "other.jpg";
    }
    return (
      <ExpansionPanel onChange={this.handleShow}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {`${matchData.map} - ${matchData.time.fromNow()}`}
          </Typography>
          <div className={classes.chipContainer}>
            {matchData.chips.map((chip, ind) => {
              const chipClass =
                chip === "Has Banned Players"
                  ? classes.bannedChips
                  : chip === "Loss"
                    ? classes.chipLoss
                    : chip === "Win"
                      ? classes.chipWin
                      : chip === "Has Replay"
                        ? classes.chipReplay
                        : "";
              return (
                <Chip
                  label={chip}
                  className={classNames(classes.chip, chipClass)}
                  key={ind}
                />
              );
            })}
          </div>
        </ExpansionPanelSummary>
        {this.state.show && (
          <ExpansionPanelDetails className={classes.containerParent}>
            <Grid container justify="space-around">
              <Grid item xs={12} sm={6} md={11}>
                <Card className={classes.card}>
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <List>
                        <ListItem>
                          <ListItemText>
                            <Typography variant="title">Score</Typography>
                            <span className={classes.scoreText}>
                              {`${matchData.teams.team1.score} : ${
                                matchData.teams.team2.score
                              }`}{" "}
                            </span>
                          </ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem divider>
                          <ListItemText>
                            <Typography variant="title">Duration</Typography>
                            {`${Math.round(
                              matchData.duration.asMinutes()
                            )} minutes`}
                          </ListItemText>
                        </ListItem>
                        <ListItem divider>
                          <ListItemText>
                            <Typography variant="title">Date</Typography>
                            {matchData.time.format("MMM Do YYYY, h:mm a")}
                          </ListItemText>
                        </ListItem>

                        <ListItem>
                          <ListItemText>
                            {matchData.replayLink ? (
                              <a
                                href={matchData.replayLink}
                                className={classes.replayLink}
                              >
                                {" "}
                                Download Replay
                              </a>
                            ) : (
                              "No Replay Available"
                            )}
                          </ListItemText>
                        </ListItem>
                      </List>
                    </CardContent>
                  </div>
                  <CardMedia
                    className={classes.cover}
                    image={resolveMap(matchData.map.split(" ")[1])}
                    title={matchData.map}
                  />
                  <CardContent className={classes.content}>
                    <List>
                      <ListItem>
                        <ListItemText>
                          <Typography variant="headline">
                            Your Performance
                          </Typography>
                        </ListItemText>
                      </ListItem>
                      <Divider />
                      <ListItem divider>
                        <ListItemText>
                          <Typography variant="title">Rating</Typography>
                          {userMatchData.rating}
                        </ListItemText>
                      </ListItem>
                      <ListItem divider>
                        <ListItemText>
                          <Typography variant="title">HSP</Typography>
                          {userMatchData.hsp}%
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>
                          <Typography variant="title">Score</Typography>
                          {userMatchData.score}
                        </ListItemText>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container justify="space-around">
              <PlayerTable players={matchData.teams.team1.players} />
              <PlayerTable players={matchData.teams.team2.players} />
            </Grid>
          </ExpansionPanelDetails>
        )}
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(SimpleExpansionPanel);
