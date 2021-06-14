import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { UIActions } from "../app/ui/ui.action";
import { UIState } from "../app/ui/ui.reducer";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Icon } from "@material-ui/core";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertInfo: React.FunctionComponent<{}> = () => {
  const dispatch = useDispatch();

  const { type, message, showMessage } = useSelector<any, UIState>(
    (state) => state.uiReducer
  );

  const handleClose = () => {
    dispatch(UIActions.alertClear());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={showMessage}
      autoHideDuration={6000}
      onClose={(e, reason) => {
        if (reason !== "clickaway") {
          handleClose();
        }
      }}
      aria-describedby="client-snackbar"
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <Icon>cross</Icon>
        </IconButton>,
      ]}
    >
      <Alert onClose={() => handleClose()} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertInfo;
