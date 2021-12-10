import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { deleteUser, getUsers, updateUser } from '../../Services/Users';

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
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    tableHead: {
        fontWeight: 'bold', textTransform: 'uppercase'
    },
    circularContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        marginTop: "20px"

    },
    colorPrimary: {
        color: "#29C1C1"
    }
});

export default function Users() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [render, setRender] = useState(false)
    


    const classes = useStyles();
    useEffect(async () => {
        setLoading(true)
        const resp = await getUsers()
        if (resp.success) {
            setLoading(false)
            setUsers(resp.results)
        } else {
            setLoading(false)
            alert(JSON.stringify(resp.error))
        }
    }, [render])
    const enable=async(user)=>{
        // console.log("user",user)
        setLoading(true)
        const resp=await updateUser(user._id,{status:true})
        console.log("Enable",resp.data)
        if(resp.data.success){
            setRender(!render)
        }else{
            setLoading(false)
            alert(JSON.stringify(resp.data.error))
        }


    }
    const disable=async(user)=>{
        // console.log("user",user)
        setLoading(true)
        const resp=await updateUser(user._id,{status:false})
        console.log("Disable",resp.data)
        if(resp.data.success){
            setRender(!render)
        }else{
            setLoading(false)
            alert(JSON.stringify(resp.data.error))
        }
    }
    const delUser=async(user)=>{
        setLoading(true)
        const resp=await deleteUser(user._id)
        console.log("Delete",resp.data)
        if(resp.data.success){
            setRender(!render)
        }else{
            setLoading(false)
            alert(JSON.stringify(resp.data.error))
        }
    }
    return (
        <Grid container style={{ padding: 20 }}>
            <Grid item xs={12}>
                <Typography variant="h4" style={{ color: '#29C1C1', marginBottom: 20, fontWeight: '700', textTransform: 'uppercase', }}>
                    USERS
                </Typography>
            </Grid>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell className={classes.tableHead}>Username</StyledTableCell>
                            <StyledTableCell className={classes.tableHead} >Email</StyledTableCell>
                            <StyledTableCell className={classes.tableHead} >Status</StyledTableCell>
                            <StyledTableCell className={classes.tableHead} >Payment Status</StyledTableCell>
                            <StyledTableCell className={classes.tableHead} >Actions</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ?
                            <Grid className={classes.circularContainer} item xs={12}>
                                <CircularProgress size={100} classes={{ colorPrimary: classes.colorPrimary }} />
                            </Grid>
                            :
                            <>
                                {
                                    users.map((row) => (
                                        <StyledTableRow key={row._id}>
                                            <StyledTableCell component="th" scope="row">
                                                <Grid container alignItems="center">
                                                    <Avatar alt="Remy Sharp" style={{ marginRight: 20 }} src={row.photo} />
                                                    {row.username}
                                                </Grid>
                                            </StyledTableCell>
                                            <StyledTableCell >{row.email}</StyledTableCell>
                                            <StyledTableCell >
                                                {row.status ?
                                                    <div style={{ backgroundColor: 'rgba(0,255,0,0.15)', borderRadius: '5px', textAlign: 'center' }}>
                                                        <p style={{ fontWeight: 'bold', padding: '5px', color: 'green' }}>Active</p>
                                                    </div> :
                                                    <div style={{ backgroundColor: 'rgba(255,0,0,0.15)', borderRadius: '5px', textAlign: 'center' }}>
                                                        <p style={{ fontWeight: 'bold', padding: '5px', color: 'red' }}>Disable</p>
                                                    </div>}
                                            </StyledTableCell>
                                            <StyledTableCell >5</StyledTableCell>
                                            <StyledTableCell >
                                                <Grid container >
                                                    {!row.status ?
                                                        <Button 
                                                        onClick={()=>enable(row)}
                                                        variant="contained" style={{ marginRight: 20, backgroundColor: 'rgba(41, 150, 211,0.9)', borderColor: '#2996D3', color: '#fff', fontWeight: 'bold' }} color="primary">
                                                            Enable
                                                        </Button>
                                                        :
                                                        <Button 
                                                        onClick={()=>disable(row)}
                                                        variant="contained" style={{ marginRight: 20, backgroundColor: 'rgba(255,0,0,0.7)', borderColor: 'rgba(255,0,0,0.7)', color: '#fff', fontWeight: 'bold' }}>
                                                            Disable
                                                        </Button>
                                                        }
                                                        <Button 
                                                        onClick={()=>delUser(row)}
                                                        variant="contained" style={{ marginRight: 20, backgroundColor: 'rgba(255,0,0,0.7)', borderColor: 'rgba(255,0,0,0.7)', color: '#fff', fontWeight: 'bold' }}>
                                                            Delete
                                                        </Button>
                                                </Grid>

                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                }
                            </>
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}
