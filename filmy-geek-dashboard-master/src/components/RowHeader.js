import React from 'react'
import Grid from "@material-ui/core/grid";
import Typography from "@material-ui/core/typography";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    rowheader: {
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        background: "linear-gradient(95deg, #9cffac 0%, #90edb3 59.91%, #7bcbc0 100%)",
        borderRadius: 20,
        color: "#fff",
        fontWeight: "bold",
        padding: 20,
    },
    bottomcardtypography: {
        fontWeight: "bold",
        textAlign: "left"
    },

}));
const RowHeader = () => {
    const classes = useStyles();
    return (
        <Grid container className={classes.rowheader}>
            <Grid item sm={6} md={3} xs={6}>
                <Typography variant="body1" className={classes.bottomcardtypography}>USER NAME</Typography>
            </Grid>
            <Grid item sm={6} md={4} xs={6}>
                <Typography variant="body1" className={classes.bottomcardtypography}>EMAIL ADDRESS </Typography>
            </Grid>
            <Grid item sm={6} md={2} xs={6}>
                <Typography variant="body1" className={classes.bottomcardtypography}>PROFILE</Typography>
            </Grid>
            <Grid item sm={6} md={3} xs={6}>
                <Typography variant="body1" className={classes.bottomcardtypography}>ACTION</Typography>
            </Grid>
        </Grid>
    )
}

export default RowHeader
