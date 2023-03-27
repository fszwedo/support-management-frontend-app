import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
      infoButton: {
        color: "white"
      }
}));
