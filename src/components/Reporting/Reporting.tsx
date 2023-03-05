import { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, IconButton, Tooltip, Typography, Modal } from '@material-ui/core';
import { SlInfo,SlClose } from "react-icons/sl";

interface ReportingBox {
    id?:number,
    name:string,
    description:string
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
    textAlign: 'center',
    height:"150px",
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between"
  },
  name: {
    cursor: 'pointer',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const data = [
  { id: 1, name: 'Purchase Events', description: 'Description for Purchase Events' },
  { id: 2, name: 'Referrers', description: 'Description for Referrers' },
  { id: 3, name: 'Live Assistants', description: 'Description for Live Assistants' },
  { id: 4, name: 'Assistant starts', description: 'Description for Assistant starts' },
];

const Reporting = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState<ReportingBox>({name:"",description:""});

  const handleBoxClick = (box:any) => {
    setSelectedBox(box);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid key={item.id} item xs={6} sm={3}>
            <Box className={classes.box}>
              <Typography variant="h6" className={classes.name} onClick={() => handleBoxClick(item)}>
                {item.name}
              </Typography>
              <Tooltip title={item.description}>
                <IconButton aria-label="description">
                  <SlInfo style={{color:'white'}} />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Modal
        className={classes.modal}
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className={classes.paper}>
          <SlClose onClick={handleModalClose} style={{cursor:"pointer"}}/>  
          <Typography variant="h4" id="modal-title">
            {selectedBox.name}
          </Typography>
          <Typography variant="body1" id="modal-description">
            {selectedBox.description}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Reporting;