import { useState } from "react";
import { QueryTypes } from "./QueryTypes";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import { SlInfo } from "react-icons/sl";
import ReportingQueryModals from "./ReportingQueryModals";
import { useStyles } from "./CSS_Reporting/ReportingCSS";

export interface ReportingQuery {
  name: string;
  description: string;
}

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
    localStorage.setItem("queryType", box.name);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {QueryTypes.map((item) => (
          <Grid key={item.id} item xs={6} sm={3}>
            <Box className={classes.box} onClick={() => handleQueryClick(item)}>
              <Typography variant="h6" className={classes.name}>
                {item.name}
              </Typography>
              <Tooltip title={item.description}>
                <IconButton aria-label="description">
                  <SlInfo className={classes.infoButton} />
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
