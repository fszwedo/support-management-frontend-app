import { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import { useStyles } from "./CSS_Reporting/ReportingDatePickerCSS";

export default function DatePickers() {
  const classes = useStyles();

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const currentDate = `${year}-${month}-${day}`;

  const [startDate, setStartDate] = useState<Date | String>(currentDate);
  const [endDate, setEndDate] = useState<Date | String>(currentDate);

  const requiredStartDateError = startDate > currentDate;
  const requiredEndDateError = startDate > endDate;

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
        helperText={
          requiredStartDateError ? "Start date cannot be in the future" : null
        }
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
        helperText={
          requiredEndDateError ? "End date cannot be before start date" : ""
        }
        error={requiredEndDateError}
      />
    </Grid>
  );
}
