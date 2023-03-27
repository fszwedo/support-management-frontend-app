import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "500px",
  },
  labelColor: {
    color: "white",
  },
  textField: {
    "& .MuiInput-root": {
      borderBottom: "white !important",
    },
    marginTop: "16px",
    marginLeft: "8px",
  },
  closeIcon: {
    cursor: "pointer",
  },
  emailButton: {
    marginTop: "20px",
    marginLeft: "5px",
  },
  successBox: {
    marginTop: "16px",
    color: "#008000",
    fontWeight: "bold",
    height: "200px",
    width: "max-width",
  },
  errorBox: {
    marginTop: "16px",
    color: "red",
    height: "200px",
    width: "max-width",
  },
  errorMailSpan: {
    color: "white"
  }
}));
