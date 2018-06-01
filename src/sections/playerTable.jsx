import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import {
  Avatar,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  Typography
} from "@material-ui/core";
const styles = theme => ({
  root: {
    width: "100%"
  },
  steamLink: {
    textDecoration: "none",
    color: "rgba(0, 0, 0, 0.87)"
  },
  avatar: {
    margin: 10
  },
  nameContainer: {
    display: "flex",
    alignItems: "center",
    maxWidth: "160px"
  },
  banned: {
    backgroundColor: "#FFCDD2 !important"
  },
  mainUser: {
    backgroundColor: "#BBDEFB"
  }
});

class PlayerTable extends React.Component {
  state = {
    showDialog: false,
    dialogMessage: {
      banTypes: "",
      dateBanned: {},
      steamID: ""
    }
  };
  handleClose = () => {
    this.setState({ showDialog: false });
  };
  handleClick = info => {
    return () => {
      this.setState({
        showDialog: true,
        dialogMessage: {
          banTypes: info.bans.banTypes,
          dateBanned: info.bans.dateBanned,
          steamID: info.steamID
        }
      });
    };
  };
  render() {
    console.log(this.state.dialogMessage);
    const { players, classes } = this.props;
    const { dialogMessage, showDialog } = this.state;
    return (
      <Grid item xs={12} sm={5} md={5}>
        <Paper className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell numeric>Kills</TableCell>
                <TableCell numeric>Assists</TableCell>
                <TableCell numeric>Deaths</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map(n => {
                const isBanned = n.bans.isBanned ? classes.banned : "";
                const isMain = n.isMain ? classes.mainUser : "";
                return (
                  <TableRow
                    key={n.steamID}
                    className={classNames(isBanned, isMain)}
                    onClick={isBanned ? this.handleClick(n) : () => {}}
                  >
                    {isBanned && (
                      <Dialog
                        onClose={this.handleClose}
                        open={showDialog}
                        aria-labelledby="simple-dialog-title"
                      >
                        <div>
                          <List>
                            <ListItem divider>
                              <ListItemText>
                                <Typography variant="title">
                                  Ban Type
                                </Typography>
                                {dialogMessage.banTypes
                                  ? dialogMessage.banTypes.join(",")
                                  : ""}
                              </ListItemText>
                            </ListItem>
                            <ListItem divider>
                              <ListItemText>
                                <Typography variant="title">
                                  Date Banned
                                </Typography>
                                {dialogMessage.banTypes
                                  ? dialogMessage.dateBanned.format()
                                  : ""}
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText>
                                <Typography variant="title">
                                  Steam ID
                                </Typography>
                                {dialogMessage.banTypes
                                  ? dialogMessage.steamID
                                  : ""}
                              </ListItemText>
                            </ListItem>
                          </List>
                        </div>
                      </Dialog>
                    )}
                    <TableCell component="th" scope="row">
                      <div className={classes.nameContainer}>
                        <Avatar className={classes.avatar}>{n.name[0]}</Avatar>
                        <a
                          href={n.steamProfileLink}
                          className={classes.steamLink}
                        >
                          {n.name}{" "}
                        </a>
                      </div>
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
    );
  }
}

export default withStyles(styles)(PlayerTable);
