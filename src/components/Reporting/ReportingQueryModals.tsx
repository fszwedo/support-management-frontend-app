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

interface IPROPS {
  selectedQuery: ReportingQuery;
  closeHandler: Function;
}

const currentQuery = localStorage.getItem("queryType");

//Different URLs for different queries
// const URL:string="";
// if (currentQuery === "Purchase Events")
//   URL = `http://localhost:3001/api/reporting/purchase-events`;
// else
//   URL = "";

const URL = `http://localhost:3001/api/reporting/purchase-events`;


const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  labelColor: {
    color: "white",
  },
  textField: {
    "& .MuiInput-root": {
      borderBottom: "white !important",
    },
  },
}));

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
        console.log(response);
      })
      .catch(function (error) {
        setIsLoading(false);
        setSubmitError(true);
        removeLocalStorageItems();
        console.log(error);
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
              style={{ cursor: "pointer" }}
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
                style={{ marginTop: "16px", marginLeft: "8px" }}
                InputLabelProps={{
                  className: classes.labelColor,
                }}
              />

              <DatePickers />
              <Button
                variant="contained"
                size="small"
                style={{ marginTop: "20px", marginLeft: "5px" }}
                type="submit"
              >
                Send me email
              </Button>
            </form>
          )}

          {isLoading && <Loader />}

          {!isLoading && submitButtonClicked && !submitError && (
            <Box
              style={{
                marginTop: "16px",
                color: "#008000",
                fontWeight: "bold",
              }}
            >
              Thank you! Report will be sent to your email soon!
            </Box>
          )}

          {!isLoading && submitButtonClicked && submitError && (
            <Box
              style={{
                marginTop: "16px",
                color: "red",
              }}
            >
              Sorry there seems to be an error. Please try again after sometime!
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ReportingQueryModals;
