import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    width: '100%',

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      // width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

interface FormValidatorProps {
  children: React.ReactNode;
  onSubmit: () => void;
  onReset?: () => void;
}

const FormValidator = (props: FormValidatorProps) => {
  const classes = useStyles();

  const { onSubmit, children, onReset } = props;

  return (
    
      <form className={classes.root} onSubmit={onSubmit} onReset={onReset}>
        {children}
      </form>
    
  );
};

export default FormValidator;
