import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  Divider,
  Chip,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    width: "100%"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    flexBasis: "75%",
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
  }
});

function SimpleExpansionPanel(props) {
  const { classes, matches } = props;
  return (
    <div className={classes.root}>
      <Typography variant="display1" className={classes.headline}>
        Matches List
      </Typography>
      <Divider inset className={classes.divider} />
      {matches
        ? matches.map((match, ind) => {
            return (
              <ExpansionPanel key={ind}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>
                    {`${match.map} - ${match.time.fromNow()}`}
                  </Typography>
                  <div>
                  {match.chips.map((chip, ind) => {
                    return <Chip label={chip} className={classes.chip} key={ind}/>;
                  })}
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container justify="space-around">
                    <Grid item xs={12} sm={5} md={5}>
                      <Paper className={classes.root}>
                        <Table className={classes.table}>
                          <TableHead>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell numeric>Kills</TableCell>
                              <TableCell numeric>Assists</TableCell>
                              <TableCell numeric>Deaths</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {match.teams.team1.players.map(n => {
                              return (
                                <TableRow key={n.id}>
                                  <TableCell component="th" scope="row">
                                    {n.name}
                                  </TableCell>
                                  <TableCell numeric>{n.kills}</TableCell>
                                  <TableCell numeric>{n.assists}</TableCell>
                                  <TableCell numeric>{n.deaths}</TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={5} md={5}>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                          <TableHead>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell numeric>Kills</TableCell>
                              <TableCell numeric>Assists</TableCell>
                              <TableCell numeric>Deaths</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {match.teams.team2.players.map(n => {
                              return (
                                <TableRow key={n.id}>
                                  <TableCell component="th" scope="row">
                                    {n.name}
                                  </TableCell>
                                  <TableCell numeric>{n.kills}</TableCell>
                                  <TableCell numeric>{n.assists}</TableCell>
                                  <TableCell numeric>{n.deaths}</TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </Paper>
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })
        : ""}
    </div>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleExpansionPanel);
