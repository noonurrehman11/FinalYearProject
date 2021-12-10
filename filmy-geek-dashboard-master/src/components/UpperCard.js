import React from 'react'
import Grid from "@material-ui/core/grid";
import Card from "@material-ui/core/card";
import Typography from "@material-ui/core/typography";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
    upperCard: {
        padding: 10,
        borderRadius: "10px 10px 0px 0px",
        marginRight: 40,
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    },
    uppercardtypography: {
        color: "#00b59c",
        fontWeight: "bold",
        textTransform: "uppercase",
    },
}));

const UpperCard = ({
    text
}) => {
    const classes = useStyles();
    return (
        <Grid container direction="row-reverse">
        <Card className={classes.upperCard}>
            <Typography variant="h5" className={classes.uppercardtypography}>{text}</Typography>
        </Card>
    </Grid>
    )
}

export default UpperCard
