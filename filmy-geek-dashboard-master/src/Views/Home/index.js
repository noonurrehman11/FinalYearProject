import React, { PureComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    LineChart,
    Line,
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Sector, ResponsiveContainer
} from 'recharts';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CountUp from 'react-countup';

import Typography from '@material-ui/core/Typography';
import { Grid, Paper } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';


import Alert from './../../components/Alert';
import Loader from '../../components/Loader';
import { getAnalytics } from '../../Services/analytics';
import { style } from 'dom-helpers';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    headerContainer: {
        marginTop: '7vh',
        padding: '0px 50px',
    },
    paperOne: {
        textAlign: 'center',
        padding: '20px 8px 20px',
        backgroundColor: '#7bcbc0',
        borderRadius: '20px',
        height: '29vh',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)'
    },
    paperTwo: {
        textAlign: 'center',
        padding: '20px 8px 10px',
        backgroundColor: 'rgba(41, 150, 211,0.9)',
        borderRadius: '20px',
        height: '29vh',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)'
    },
    paperThree: {
        textAlign: 'center',
        padding: '20px 8px 20px',
        backgroundColor: 'rgba(41, 150, 211,0.7)',
        borderRadius: '20px',
        height: '29vh',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)'
    },
    paperFour: {
        textAlign: 'center',
        padding: '20px 8px 20px',
        backgroundColor: 'rgba(41, 193, 193,0.9)',
        borderRadius: '20px',
        height: '29vh',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)'
    },
    number: {
        fontWeight: 'bold',
        color: '#fff',
        overflowWrap: 'break-word'
    },
    textCitizenRequest: {
        fontWeight: 'bold',
        color: '#fff',
        paddingTop: '10px',
        overflowWrap: 'break-word'
    },
    textResponderRequest: {
        fontWeight: 'bold',
        color: '#fff',
        overflowWrap: 'break-word'
    },
    textUser: {
        fontWeight: 'bold',
        color: '#fff',
        paddingTop: '30px',
        overflowWrap: 'break-word'
    },
    textRescue: {
        fontWeight: 'bold',
        color: '#fff',
        paddingTop: '30px',
        overflowWrap: 'break-word'
    },
    paperPie: {
        textAlign: 'center',
        padding: '20px 8px 20px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        // height: '29vh',

        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)'
    },
    textPie: {
        fontSize: '0.6rem',
        overflowWrap: 'break-word'
    }
});

export default function Home() {
    const classes = useStyles();
    const matches = useMediaQuery(theme => theme.breakpoints.up('lg'));

   
    const [analytics, setAnalytics] = useState([])
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true);
        getAnalytics()
            .then(res => {
                if (res.data.success) {
                    console.log(res.data.results)
                    setAnalytics(res.data.results)
                    setLoading(false)
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
        // getApplyCitizens()
        // .then(res => {
        //     // console.log("All Citizens", res.data)
        //     if (res.data.success) {
        //         setCitizensRequest(res.data.data) // set the state
        //     } else {
        //         setLoading(false)
        //         Alert("Error", res.data.error?.message)
        //     }
        // })
        // getApplyResponders()
        //     .then(res => {
        //         if (res.data.success) {
        //             setRespondersRequest(res.data.data) // set the state
        //         } else {
        //             setLoading(false)
        //             Alert("Error", res.data.error?.message)
        //         }
        //     })

        // setLoading(false)

    }, [])






    const data = [
        { "name": 'Jan', "Registered Users": analytics[0]?.Jan.registeredUsers },
        { "name": 'Feb', "Registered Users": analytics[0]?.Feb.registeredUsers },
        { "name": 'Mar', "Registered Users": analytics[0]?.March.registeredUsers },
        { "name": 'Apr', "Registered Users": analytics[0]?.Apr.registeredUsers },
        { "name": 'May', "Registered Users": analytics[0]?.May.registeredUsers },
        { "name": 'Jun', "Registered Users": analytics[0]?.Jun.registeredUsers },
        { "name": 'Jul', "Registered Users": analytics[0]?.Jul.registeredUsers },
        { "name": 'Aug', "Registered Users": analytics[0]?.August.registeredUsers },
        { "name": 'Sep', "Registered Users": analytics[0]?.Sep.registeredUsers },
        { "name": 'Oct', "Registered Users": analytics[0]?.Oct.registeredUsers },
        { "name": 'Nov', "Registered Users": analytics[0]?.Nov.registeredUsers },
        { "name": 'Dec', "Registered Users": analytics[0]?.Dec.registeredUsers },

    ];

   
    if (loading) {
        return (
            <Loader />
        )
    }
    console.log("DAta", data)
    return (
        <>
            <Grid container spacing={3} className={classes.headerContainer} justifyContent="center">

                <Grid item xs={12} sm={11} md={4} lg={3}>
                    <Paper className={classes.paperFour} elevation={3}>
                        <Typography variant="h2" component="h2" className={classes.number}>
                            <CountUp start={0} end={500} duration={3} />
                        </Typography>
                        <Typography variant="h6" component="h2" className={classes.textRescue}>
                            USERS
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={11} md={4} lg={3}>
                    <Paper className={classes.paperFour} elevation={3} style={{backgroundColor:'rgba(41, 150, 211,0.7)'}}>
                        <Typography variant="h2" component="h2" className={classes.number}>
                            <CountUp start={0} end={500} duration={3} />
                        </Typography>
                        <Typography variant="h6" component="h2" className={classes.textRescue}>
                            MOVIES
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={11} md={4} lg={3}>
                    <Paper className={classes.paperThree} elevation={3} style={{backgroundColor:'rgba(255,0,0,0.6)'}}>
                        <Typography variant="h2" component="h2" className={classes.number}>
                            <CountUp start={0} end={users.length} duration={3} />

                        </Typography>
                        <Typography variant="h6" component="h2" className={classes.textUser}>
                            COMPLAINTS
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={11} md={4} lg={3}>
                    <Paper className={classes.paperFour} elevation={3} style={{backgroundColor:'rgba(0,100,0,0.6)'}}>
                        <Typography variant="h2" component="h2" className={classes.number}>
                            <CountUp start={0} end={500} duration={3} />
                        </Typography>
                        <Typography variant="h6" component="h2" className={classes.textRescue}>
                            MOVIES REQUESTS
                        </Typography>
                    </Paper>
                </Grid>
                <Grid container spacing={3} justifyContent="center">

                    <Grid item xs={12} sm={12} style={{ marginTop: "30px" }}>
                        <Paper className={classes.paperPie} elevation={3}>
                            {/* aspect={4.0/3.0} */}
                            <ResponsiveContainer width="100%" aspect={4 / 1}>
                                <LineChart data={data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 15 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" stroke="#29C1C1" />
                                    <YAxis />
                                    <Legend />
                                    <Line type="monotone" dataKey="Registered Users" stroke="#29C1C1" />
                                    

                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                </Grid>
            </Grid>
        </>
    );
}
