import React, { Component } from "react";
import {
  withStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField
} from "@material-ui/core";

const style = {
  apiLink: {
    color: "rgba(0, 0, 0, 0.87)",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
};

const HasKeyDialog = props => {
  const { showDialog, dispatch } = props;
  const handleClose = value => {
    return () => {
      dispatch(value);
    };
  };
  return (
    <Dialog
      open={showDialog}
      onClose={handleClose(true)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">API Key</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          We detected an API Key in localStorage. Use it?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose(true)} color="primary">
          Yes
        </Button>
        <Button onClick={handleClose(false)} color="primary" autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

class NoKeyDialog extends Component {
  state = {
    key: ""
  };
  handleClose = value => {
    console.log(this);
    this.props.dispatch(this.state.key);
  };
  render() {
    const { showDialog, classes } = this.props;
    return (
      <Dialog
        open={showDialog}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">API Key</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Because Valve rate-limits their API call, we need to have our own
            API key to avoid it. Please get yours{" "}
            <a
              className={classes.apiLink}
              href="https://steamcommunity.com/dev/apikey"
            >
              here
            </a>.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="key"
            label="API key"
            type="text"
            onChange={e => this.setState({ key: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const NoKeyDialogStyled = withStyles(style)(NoKeyDialog);

class ApiDialog extends Component {
  handleInput = key => {
    this.props.dialogEnd({
      newKey: true,
      key
    });
  };
  handleConfirm = bool => {
    this.props.dialogEnd({
      newKey: false,
      getNew: !bool,
    });
  };

  render() {
    const { showConfirm, showInput } = this.props;
    return (
      <div>
        <NoKeyDialogStyled
          showDialog={showInput}
          dispatch={this.handleInput}
        />
        <HasKeyDialog
          showDialog={showConfirm}
          dispatch={this.handleConfirm}
        />
      </div>
    );
  }
}

export default ApiDialog;
