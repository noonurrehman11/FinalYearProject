import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#29C1C1',
        color: '#fff',
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#fff',
        },
    },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Atta', 159, 6.0, 24, 4.0),
    createData('Maria', 237, 9.0, 37, 4.3),
    createData('Noon', 262, 16.0, 24, 6.0),
    createData('Haroon', 305, 3.7, 67, 4.3),
    createData('Ali', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    tableHead:{
        fontWeight:'bold',textTransform:'uppercase'
    }
});

export default function Subscriptions() {
    const classes = useStyles();

    return (
        <Grid container style={{ padding: 20 }}>
            <Grid item xs={12}>
                <Typography variant="h4" style={{ color:'#29C1C1',marginBottom: 20, fontWeight: '700', textTransform: 'uppercase',  }}>
                    SUBSCRIPTIONS
                </Typography>
            </Grid>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell className={classes.tableHead}>Username</StyledTableCell>
                            <StyledTableCell className={classes.tableHead} >Email</StyledTableCell>
                            <StyledTableCell className={classes.tableHead} >Subscription Status</StyledTableCell>
                            <StyledTableCell className={classes.tableHead} >Actions</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    <Grid container alignItems="center">
                                        <Avatar alt="Remy Sharp" style={{ marginRight: 20 }} src="/static/images/avatar/1.jpg" />
                                        {row.name}
                                    </Grid>
                                </StyledTableCell>
                                <StyledTableCell >noonurrehman@gmail.com</StyledTableCell>
                                <StyledTableCell >
                                    {/* <div style={{backgroundColor:'rgba(0,255,0,0.15)',borderRadius:'5px',textAlign:'center',margin:'0px 50px'}}>
                                            <p style={{fontWeight:'bold',padding:'5px',color:'green'}}>Active</p>
                                    </div> */}
                                    <div style={{backgroundColor:'rgba(255,0,0,0.15)',borderRadius:'5px',textAlign:'center',margin:'0px 50px'}}>
                                            <p style={{fontWeight:'bold',padding:'5px',color:'red'}}>Banned</p>
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell >
                                    <Grid container >
                                        <Button variant="contained" style={{ marginRight: 20,backgroundColor:'rgba(41, 150, 211,0.9)',borderColor:'#2996D3',color:'#fff',fontWeight:'bold' }} color="primary">
                                            HALT
                                        </Button>
                                        <Button variant="contained" style={{ marginRight: 20,backgroundColor:'rgba(255,0,0,0.7)',borderColor:'rgba(255,0,0,0.7)',color:'#fff',fontWeight:'bold' }}>
                                            Delete
                                        </Button>
                                    </Grid>

                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}
