import { makeStyles, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) =>
createStyles({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(4),
    width: 200,
    "& input::-webkit-calendar-picker-indicator": {
      filter:
        "invert(1) brightness(100%) sepia(100%) saturate(10000%) hue-rotate(180deg)",
    },
    "& .Mui-error": {
      color: "white",
    },
    "& .MuiFormHelperText-root": {
      color: "white",
    },
    "& .MuiInput-underline.Mui-error:after": {
      borderBottomColor: "black",
    },
  },
  labelColor: {
    color: "white",
  },
})
);