import React from 'react'
import Grid from "@material-ui/core/grid";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({

    circularContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
    },
    colorPrimary: {
        color: "#29C1C1"
    }
}));


const Loader = () => {
    const classes = useStyles();
    return (
        <Grid className={classes.circularContainer}>
            <CircularProgress size={100}  classes={{colorPrimary: classes.colorPrimary}} />
        </Grid>
    )
}

export default Loader
