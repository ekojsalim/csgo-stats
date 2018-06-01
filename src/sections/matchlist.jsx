import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Divider,
  Typography,
  Grid,
  Button,
  TextField,
  MenuItem
} from "@material-ui/core";

import MatchItem from "sections/matchitem";

function debounce(a, b, c) {
  /* eslint-disable */
  var d, e;
  return function() {
    function h() {
      (d = null), c || (e = a.apply(f, g));
    }
    var f = this,
      g = arguments;
    return (
      clearTimeout(d), (d = setTimeout(h, b)), c && !d && (e = a.apply(f, g)), e
    );
  };
}

function fastFilter(array, fn, thisArg) {
  /* eslint-disable */
  var result = [],
    test =
      thisArg === undefined
        ? fn
        : function(a, b, c) {
            return fn.call(thisArg, a, b, c);
          },
    i,
    len;
  for (i = 0, len = array.length; i < len; i++) {
    if (test(array[i], i, array)) result.push(array[i]);
  }
  return result;
}

const styles = theme => ({
  root: {
    width: "100%"
  },
  headline: {
    marginTop: "12px"
  },
  divider: {
    margin: "12px 0"
  },
  input: {
    margin: theme.spacing.unit,
    flex: "1 0 0"
  },
  matchesText: {
    margin: theme.spacing.unit
  },
  defaultMargin: {
    margin: theme.spacing.unit
  },
  matchesTextContainer: {
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  inputsContainer: {
    display: "flex"
  }
});

class Matches extends React.PureComponent {
  render() {
    const {matches, userMatchesData} = this.props
    return (
      <div>
        {matches &&
          matches.map((match, ind) => {
            return (
              <MatchItem
                matchData={match}
                key={match.id}
                userMatchData={userMatchesData.find(
                  userMatch => match.id === userMatch.matchID
                )}
              />
            );
          })}
      </div>
    );
  }
}

class SimpleExpansionPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      entries: 30,
      query: "",
      filters: "none",
      sortBy: "date",
      sortDirection: "ascending"
    };
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      entries: prevState.entries + 30
    }));
  };

  handleSearch = debounce(query => {
    this.setState({ query });
  }, 150);

  handleSelect = event => {
    this.setState({
      filters: event.target.value
    });
  };

  handleSelectSort = event => {
    const sortBy = event.target.value.split("-")[0];
    const sortDirection = event.target.value.split("-")[1];
    this.setState({
      sortBy,
      sortDirection
    });
  };

  render() {
    const { classes, userMatchesData, matchesData } = this.props;
    const sortFunction = (a, b) => {
      const sortBy = this.state.sortBy;
      const sortDirection = this.state.sortDirection;
      if(sortBy === "date") {
        const momentDiff = a.time.diff(b.time);
        const test = sortDirection === "ascending" ? -(momentDiff) : momentDiff;
        return test;
      }
      if(sortBy === "rating") {
        const findMatch = (match) =>  userMatchesData.find((userMatch) => match.id===userMatch.matchID);
        const z = findMatch(a).rating;
        const y = findMatch(b).rating;
        return sortDirection === "ascending" ? z - y : y - z;
      }
      if(sortBy ==="duration") {
        return sortDirection === "ascending" ? (+a.duration) - (+b.duration) : (+b.duration) - (+a.duration);
      }
    };
    let matches2 =
      !!matchesData &&
      fastFilter(matchesData, match => {
        return (
          !this.state.query || match.tags.join("").includes(this.state.query)
        );
      });
    if (this.state.filters !== "none") {
      matches2 = fastFilter(matches2, match => {
        return match.tags.includes(this.state.filters);
      });
    }
    const matches = !!matches2 && matches2.sort(sortFunction).slice(0, this.state.entries);

    return (
      <div className={classes.root}>
        <Typography variant="display1" className={classes.headline}>
          Matches List
        </Typography>
        <Divider inset className={classes.divider} />
        <Grid container justify="space-between">
          <Grid item xs={12} sm={6} md={6}>
            <div className={classes.inputsContainer}>
              <TextField
                label="Search"
                placeholder="Search player, maps, results"
                className={classes.input}
                fullWidth
                onChange={e => {
                  this.handleSearch(e.target.value.toLowerCase());
                }}
                inputProps={{
                  "aria-label": "Search"
                }}
              />
              <TextField
                id="filter"
                select
                label="Filter"
                value={this.state.filters}
                className={classes.input}
                onChange={this.handleSelect}
                margin="normal"
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="hasbanned">Has Banned Players</MenuItem>
                <MenuItem value="nobanned">No Banned Players</MenuItem>
                <MenuItem value="win">Wins</MenuItem>
                <MenuItem value="loss">Losses</MenuItem>
                <MenuItem value="draw">Draws</MenuItem>
              </TextField>
              <TextField
                id="sort-match"
                select
                label="Sort By"
                value={this.state.sortBy + "-" + this.state.sortDirection}
                className={classes.input}
                onChange={this.handleSelectSort}
                margin="normal"
              >
                <MenuItem value="date-ascending">Date Ascending</MenuItem>
                <MenuItem value="date-descending">Date Descending</MenuItem>
                <MenuItem value="rating-ascending">Rating Ascending</MenuItem>
                <MenuItem value="rating-descending">Rating Descending</MenuItem>
                <MenuItem value="duration-ascending">Duration Ascending</MenuItem>
                <MenuItem value="duration-descending">Duration Descending</MenuItem>
              </TextField>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            className={classes.matchesTextContainer}
          >
            <Typography variant="subheading" className={classes.matchesText}>
              Showing {matches ? matches.length : 0} matches out of {matches2 ? matches2.length : 0} matches
            </Typography>
          </Grid>
        </Grid>
        <Matches matches={matches} userMatchesData={userMatchesData}/>
        <Grid container justify="center">
          <Grid item xs={6} sm={4} md={2}>
            {matches &&
              matches.length >= this.state.entries && (
                <Button
                  color="primary"
                  variant="raised"
                  className={classes.defaultMargin}
                  onClick={this.handleLoadMore}
                >
                  Load More
                </Button>
              )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleExpansionPanel);
