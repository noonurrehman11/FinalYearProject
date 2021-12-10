import React, { useState, useEffect } from 'react';
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
import { deleteMovie, getMovies } from '../../Services/movies';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';

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

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    tableHead: {
        fontWeight: 'bold', textTransform: 'uppercase'
    }
});

export default function Movies() {
    const classes = useStyles();
    const [movies, setMovies] = React.useState([]);
    const [loading, setLoading] = React.useState(false);


    useEffect(() => {
        setLoading(true)
        getMovies()
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    setMovies(res.data.results);
                    setLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, []);
    console.log(movies);
    if (loading) {
        return <Loader />
    }

    return (
        <Grid container style={{ padding: 20 }}>
            <Grid item xs={12}>
                <div style={{ display: 'flex', alignItems: 'space-between', justifyContent: 'space-between', paddingBottom: '20px' }}>
                    <Typography variant="h4" style={{ color: '#29C1C1', marginBottom: 20, fontWeight: '700', textTransform: 'uppercase', }}>
                        MOVIES
                    </Typography>
                    <Link to='Add Movie' style={{ textDecoration: 'none' }}>
                        <Button variant="contained" style={{ backgroundColor: 'rgba(41, 193, 193,1)', borderColor: '#2996D3', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }} color="primary">
                            ADD NEW Movie

                        </Button>
                    </Link>
                </div>

            </Grid>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell className={classes.tableHead}>Movie Title</StyledTableCell>
                            <StyledTableCell className={classes.tableHead} align="center">Views</StyledTableCell>
                            <StyledTableCell className={classes.tableHead} align="center">Status</StyledTableCell>

                            <StyledTableCell className={classes.tableHead} >Actions</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movies.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row">
                                    <Grid container alignItems="center">
                                        <Avatar alt="Remy Sharp" style={{ marginRight: 20 }} src={row.picture} />
                                        {row.name}
                                    </Grid>
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.views}</StyledTableCell>
                                <StyledTableCell >
                                    {
                                        (row.status) ?

                                            <div style={{ backgroundColor: 'rgba(0,255,0,0.15)', borderRadius: '5px', textAlign: 'center' }}>
                                                <p style={{ fontWeight: 'bold', padding: '5px', color: 'green' }}>Active</p>
                                            </div>
                                            :
                                            <div style={{ backgroundColor: 'rgba(255,0,0,0.15)', borderRadius: '5px', textAlign: 'center' }}>
                                                <p style={{ fontWeight: 'bold', padding: '5px', color: 'red' }}>Disable</p>
                                            </div>
                                    }
                                </StyledTableCell>

                                <StyledTableCell >
                                    <Grid container >
                                        <Link to={`/editMovie/${row._id}`} style={{ textDecoration: 'none' }}>
                                            <Button variant="contained" style={{ marginRight: 20, backgroundColor: 'rgba(41, 150, 211,0.9)', borderColor: '#2996D3', color: '#fff', fontWeight: 'bold' }} color="primary">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button variant="contained" style={{ marginRight: 20, backgroundColor: 'rgba(255,0,0,0.7)', borderColor: 'rgba(255,0,0,0.7)', color: '#fff', fontWeight: 'bold' }}
                                            onClick={() => {
                                                // console.log(row._id);
                                                setLoading(true);
                                                deleteMovie(row._id)
                                                    .then(res => {
                                                        if (res.data.success) {
                                                            
                                                            setMovies(movies.filter(movie => movie._id !== row._id));
                                                            setLoading(false);
                                                            alert('Movie Deleted Successfully');
                                                        }
                                                        else {
                                                            console.log(res.data);
                                                            setLoading(false);
                                                            alert('Error while Deleting movie');
                                                        }
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                        setLoading(false);
                                                        alert('Error while Deleting movie');
                                                    })
                                            }}
                                        >
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
