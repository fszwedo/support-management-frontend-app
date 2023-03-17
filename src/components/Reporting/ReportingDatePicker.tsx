import { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
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

export default function DatePickers() {
  const classes = useStyles();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const requiredStartDateError = startDate === null || startDate === undefined;
  const requiredEndDateError =
    endDate === null ||
    endDate === undefined ||
    startDate === null ||
    startDate === undefined;
  const helperText =
    requiredEndDateError || requiredStartDateError ? "" : undefined;

  const correctDateFormat = (date: any) => {
    const [year, month, day] = date.split("-");
    let updatedDate = `${year}-${month}-${day}`;
    return updatedDate;
  };

  const handleStartDateChange = (event: any) => {
    setStartDate(event.target.value);
    localStorage.setItem("startDate", correctDateFormat(event.target.value));
  };

  const handleEndDateChange = (event: any) => {
    setEndDate(event.target.value);
    localStorage.setItem("endDate", correctDateFormat(event.target.value));
  };

  return (
    <Grid container>
      <TextField
        required
        id="date"
        label="Start Date"
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
          className: classes.labelColor,
        }}
        onChange={handleStartDateChange}
        helperText={helperText}
        error={requiredStartDateError}
      />

      <TextField
        required
        id="date"
        label="End Date"
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
          className: classes.labelColor,
        }}
        onChange={handleEndDateChange}
        helperText={helperText}
        error={requiredEndDateError}
      />
    </Grid>
  );
}
