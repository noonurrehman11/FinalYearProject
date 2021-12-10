
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Loader from '../../components/Loader';
import { useEffect, useState } from 'react';
import { deleteComplaint, getComplaints } from '../../Services/Complaints';

const useStyles = makeStyles((theme) => ({

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',

    },
    root: {
        minWidth: 275,
        background: 'rgba(41, 150, 211,0.4)',
    },
    title: {
        fontSize: 14,
        color: '#fff'
    },
    pos: {
        marginBottom: 12,
    },
    headText: {
        textTransform: 'uppercase',
        color: '#29C1C1',
        fontWeight: 'bold',
    }
}));

export default function Complaints() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [complaints, setComplaints] = useState([])


    useEffect(() => {
        setLoading(true)
        getComplaints()
            .then(res => {
                if (res.data.success) {
                    setComplaints(res.data.results)
                    setLoading(false)
                } else {
                    setLoading(false)
                    console.log("Complaint Error", res.data.error)
                    alert(JSON.stringify(res.data.error))
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                alert(JSON.stringify(err))
            })
    }, [])
    const accept = (complaint) => {
        setLoading(true)
        // console.log("complaint",complaint)
        deleteComplaint(complaint._id)
            .then(res => {
                if (res.data.success) {
                    // alert("")

                    setComplaints(complaints.filter(item => item._id !== complaint._id))
                    setLoading(false)

                } else {
                    setLoading(false)
                    alert(JSON.stringify(res.data.error))
                }
            })
            .catch(err => {
                setLoading(false)
                alert(JSON.stringify(err))
            })


    }
    const reject = (complaint) => {
        setLoading(true)
        // console.log("complaint", complaint)
        deleteComplaint(complaint._id)
            .then(res => {
                if (res.data.success) {
                    // alert("")
                    setComplaints(complaints.filter(item => item._id !== complaint._id))
                    setLoading(false)
                } else {
                    setLoading(false)
                    alert(JSON.stringify(res.data.error))
                }
            })
            .catch(err => {
                setLoading(false)
                alert(JSON.stringify(err))
            })
    }

    if (loading) {
        return <Loader />
    }
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className={classes.headText}>Complaints</h1>
            </div>
            {complaints.length > 0 ?
                <Grid container spacing={5}>
                    {complaints.map((complaint, index) => (
                        <Grid item xs={12} md={4} lg={3} key={index}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography variant="h5" component="h2" style={{ color: 'rgba(255,255,255,0.9 )', fontWeight: 'bold' }}>
                                        {complaint.userName}
                                    </Typography>
                                    <Typography variant="h5" component="h2" style={{ color: '#fff' }}>
                                        {complaint.subject}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {complaint.detail}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        onClick={() => accept(complaint)}
                                        variant="contained" style={{ marginRight: 10, backgroundColor: 'rgba(41, 150, 211,0.9)', borderColor: '#2996D3', color: '#fff', fontWeight: 'bold' }} color="primary">
                                        Resolve
                                    </Button>
                                    <Button
                                        onClick={() => reject(complaint)}
                                        variant="contained" style={{ backgroundColor: 'rgba(255,0,0,0.7)', borderColor: 'rgba(255,0,0,0.7)', color: '#fff', fontWeight: 'bold' }}>
                                        Reject
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}


                </Grid>
                :
                <div className="noProduct">
                    <h1 style={{color: '#29C1C1'}}> No Complaints</h1>
                </div>
            }

        </div>
    );
}
