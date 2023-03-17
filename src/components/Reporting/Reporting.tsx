import { useState } from "react";
import { QueryTypes } from "./QueryTypes";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import { SlInfo } from "react-icons/sl";
import ReportingQueryModals from "./ReportingQueryModals";

export interface ReportingQuery {
  name: string;
  description: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  box: {
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    textAlign: "center",
    height: "150px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  name: {
    cursor: "pointer",
  },
}));

const Reporting = () => {
  const classes = useStyles();
  const [selectedQuery, setSelectedQuery] = useState<ReportingQuery>({
    name: "",
    description: "",
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleQueryClick = (box: any) => {
    setSelectedQuery(box);
    setModalVisible(true);
    localStorage.setItem("queryType",box.name)
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {QueryTypes.map((item) => (
          <Grid key={item.id} item xs={6} sm={3}>
            <Box className={classes.box}>
              <Typography
                variant="h6"
                className={classes.name}
                onClick={() => handleQueryClick(item)}
              >
                {item.name}
              </Typography>
              <Tooltip title={item.description}>
                <IconButton aria-label="description">
                  <SlInfo style={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        ))}
      </Grid>

      {modalVisible && (
        <ReportingQueryModals
          selectedQuery={selectedQuery}
          closeHandler={() => {
            setModalVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default Reporting;
