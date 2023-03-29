import React, { useState } from "react";
import Modal from "../Modal/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, TextField, Button } from "@material-ui/core";
import { SlClose } from "react-icons/sl";
import { ReportingQuery } from "./Reporting";
import DatePickers from "./ReportingDatePicker";
import axios from "axios";
import Loader from "../Loader/Loader";
import { QueryTypes } from "./QueryTypes";
import { BACKEND_ENDPOINTS } from "../../constants";
import { useStyles } from "./CSS_Reporting/ReportingQueryModalCSS";

interface IPROPS {
  selectedQuery: ReportingQuery;
  closeHandler: Function;
}

const URL = BACKEND_ENDPOINTS.PURCHASE_EVENTS;

const ReportingQueryModals: React.FC<IPROPS> = ({
  selectedQuery,
  closeHandler,
}) => {
  const classes = useStyles();

  const [advisorId, setAdvisorId] = useState<string>("");
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const [submitError, setSubmitError] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdvisorIdChange = (e: any): void => {
    setAdvisorId(e.target.value);
    localStorage.setItem("advisorId", e.target.value);
  };

  const removeLocalStorageItems = () => {
    localStorage.removeItem("advisorId");
    localStorage.removeItem("startDate");
    localStorage.removeItem("endDate");
  };

  const submitHandler: React.FormEventHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const dataToSend = {
      accountId: localStorage.getItem("advisorId"),
      startDate: localStorage.getItem("startDate"),
      endDate: localStorage.getItem("endDate"),
      email: localStorage.getItem("email"),
    };
    axios
      .post(URL, dataToSend, {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        setIsLoading(false);
        setSubmitError(false);
        removeLocalStorageItems();
      })
      .catch(function (error) {
        setIsLoading(false);
        setSubmitError(true);
        removeLocalStorageItems();
      });
    setSubmitButtonClicked(true);
  };

  return (
    <>
      <Modal>
        <Box className={classes.paper}>
          <Box display="flex" justifyContent="flex-end">
            <SlClose
              onClick={() => {
                closeHandler();
              }}
              className={classes.closeIcon}
            />
          </Box>
          <Typography variant="h4" id="modal-title">
            {selectedQuery.name} Report
          </Typography>

          {!submitButtonClicked && (
            <form action="submit" onSubmit={submitHandler}>
              <TextField
                required
                type="string"
                label="Enter Account ID"
                value={advisorId}
                className={classes.textField}
                onChange={handleAdvisorIdChange}
                InputLabelProps={{
                  className: classes.labelColor,
                }}
              />

              <DatePickers />
              <Button
                variant="contained"
                size="small"
                className={classes.emailButton}
                type="submit"
              >
                Send me email
              </Button>
            </form>
          )}

          {isLoading && <Loader />}

          {!isLoading && submitButtonClicked && !submitError && (
            <Box className={classes.successBox}>
              Thank you! The requested report will be sent to your email soon!
            </Box>
          )}

          {!isLoading && submitButtonClicked && submitError && (
            <Box className={classes.errorBox}>
              There was an error in submitting your export request. Please try
              again or contact{" "}
              <span className={classes.errorMailSpan}>"help@zoovu.com"</span> if the
              issue persists!
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ReportingQueryModals;
