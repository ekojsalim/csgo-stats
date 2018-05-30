import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";

let counter = 0;
function createData(map, played, win, loss, winRate) {
  counter += 1;
  return { id: counter, map, played, win, loss, winRate };
}

const columnData = [
  { id: "map", numeric: false, disablePadding: false, label: "Map" },
  { id: "played", numeric: true, disablePadding: false, label: "Times Played" },
  { id: "win", numeric: true, disablePadding: false, label: "Times Won" },
  { id: "loss", numeric: true, disablePadding: false, label: "Times Lost" },
  { id: "winRate", numeric: true, disablePadding: false, label: "Winrate" },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy} = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? "none" : "default"}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: "auto",
  },
});

class EnhancedTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: "asc",
      orderBy: "map",
      data: [],
      props: {},
    };
  }

  handleRequestSort = (event, property) => {
      console.log(event, property);
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    const data =
      order === "desc"
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  static getDerivedStateFromProps(props, state) {
      if(state.props !== props) {
        let data = [];
        Object.entries(props.mapData).forEach(([key, value])=> {
            const z = createData(key, value.played, value.win, value.loss, value.winRate);
            data.push(z);
        });
        return {
            data,
            props
        };
      }
      return state;
  }

  render() {
    const { classes} = this.props;
    const { data, order, orderBy} = this.state;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.map(n => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={n.id}
                  >
                    <TableCell component="th" scope="row">
                      {n.map}
                    </TableCell>
                    <TableCell numeric>{n.played}</TableCell>
                    <TableCell numeric>{n.win}</TableCell>
                    <TableCell numeric>{n.loss}</TableCell>
                    <TableCell numeric>{n.winRate}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(EnhancedTable);