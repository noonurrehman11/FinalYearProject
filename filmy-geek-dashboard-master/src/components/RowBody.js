import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Grid from "@material-ui/core/grid";
import Typography from "@material-ui/core/typography";
import Button from "@material-ui/core/button";
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'


const useStyles = makeStyles(() => ({
    bottomcardtypography: {
        fontWeight: "bold",
        textAlign: "left",
        overflowWrap: 'break-word'
    },
    rowbody: {
        color: "#7bcbc0",
        padding: 20,
        marginTop: 10,
    },
    btncontainer: {
        color: "#fff"
    },
    btmbtngreen: {
        color: "#fff",
        background: "#2fc452",
        fontWeight: "bold",
        borderRadius: "10px 0px 0px 10px",
    },
    btmbtnred: {
        color: "#fff",
        background: "#e85e5e",

        borderRadius: "0px 10px 10px 0px",
    },
    btnText: {
        fontWeight: "bold",
        textTransform: 'uppercase'
    }
}))


const RowBody = ({
    name = "abdulhadi98",
    // date = "21/02/2021 12:21.06",
    email = "",
    id="",
    citizen="true",
    request="true",
    onAccept,
    onReject,
    onDelete,
    onEnable,
    onDisable,
    acceptText = "",
    rejectText = "",
    firstBtnText = "",
    secondBtnText = "",
    disabled = false,

}) => {
    const classes = useStyles();
    return (
        <Grid container className={classes.rowbody} spacing={2}>
            <Grid item sm={6} md={3} xs={6} >
                <Typography variant="body1" className={classes.bottomcardtypography}>{name}</Typography>
            </Grid>
            <Grid item sm={6} md={4} xs={6} >
                <Typography variant="body1" className={classes.bottomcardtypography}>{email}</Typography>
            </Grid>
            <Grid item sm={6} md={2} xs={6} >
                <Link to={`Profile/${id}/${citizen}/${request}`} style={{textDecoration:'none',color:"#7bcbc0"}}>
                <Typography variant="body1" className={classes.bottomcardtypography}>View</Typography>
                </Link>
            </Grid>
            <Grid item sm={6} md={3} xs={6} >
                <Grid container>
                    {firstBtnText ?
                        <>
                            <Grid item xs={6}>
                            
                                    <Button variant="contained" className={classes.btmbtngreen} fullWidth
                                        onClick={async () => {
                                            Swal.fire({
                                                title: "Are you sure?",
                                                text: acceptText,
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonText: "Yes",
                                                confirmButtonColor: '#00b59c',
                                                cancelButtonText: "No",
                                                cancelButtonColor: '#e85e5e',
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    onAccept();
                                                }
                                            })
                                        }}
                                    >
                                        <Typography variant="body1" className={classes.btnText}>{firstBtnText}</Typography>
                                    </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" className={classes.btmbtnred} fullWidth
                                    onClick={async () => {
                                        Swal.fire({
                                            title: 'Are you sure?',
                                            text: rejectText,
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonText: 'Yes',
                                            confirmButtonColor: '#00b59c',
                                            cancelButtonText: 'No',
                                            cancelButtonColor: '#e85e5e',
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                onReject()
                                            }
                                        })
                                    }}
                                >
                                    <Typography variant="body1" className={classes.btnText}>{secondBtnText}</Typography>
                                </Button>
                            </Grid>
                        </>
                        :
                        <>
                            <Grid item xs={6}>
                                {(disabled) ?
                                    <Button variant="contained" className={classes.btmbtngreen} fullWidth
                                        onClick={async () => {
                                            Swal.fire({
                                                title: "Are you sure?",
                                                text: "You want to enable user account!",
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonText: "Yes",
                                                confirmButtonColor: '#00b59c',
                                                cancelButtonText: "No",
                                                cancelButtonColor: '#e85e5e',
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    onEnable();
                                                }
                                            })
                                        }}
                                    >
                                        <Typography variant="body1" className={classes.btnText}>Enable</Typography>
                                    </Button>
                                    :
                                    <Button variant="contained" className={classes.btmbtngreen} fullWidth
                                        onClick={async () => {
                                            Swal.fire({
                                                title: "Are you sure?",
                                                text: "You want to disable user account!",
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonText: "Yes",
                                                confirmButtonColor: '#00b59c',
                                                cancelButtonText: "No",
                                                cancelButtonColor: '#e85e5e',
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    onDisable();
                                                }
                                            })
                                        }}
                                    >
                                        <Typography variant="body1" className={classes.btnText}>Disable</Typography>
                                    </Button>}
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" className={classes.btmbtnred} fullWidth
                                    onClick={async () => {
                                        Swal.fire({
                                            title: 'Are you sure?',
                                            text: "You want to delete user account!",
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonText: 'Yes',
                                            confirmButtonColor: '#00b59c',
                                            cancelButtonText: 'No',
                                            cancelButtonColor: '#e85e5e',
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                onDelete()
                                            }
                                        })
                                    }}
                                >
                                    <Typography variant="body1" className={classes.btnText}>Delete</Typography>
                                </Button>
                            </Grid>
                        </>
                    }
                </Grid>
            </Grid>
        </Grid >
    )
}

export default RowBody
