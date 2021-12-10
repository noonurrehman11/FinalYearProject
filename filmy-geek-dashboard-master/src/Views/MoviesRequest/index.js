
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import { deleteMovieRequest, getMovieRequest } from '../../Services/MoviesRequest';
import Loader from '../../components/Loader';
import { useHistory } from 'react-router';

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

export default function MoviesRequest() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [movieRequests, setMovieRequests] = useState([])
    const history=useHistory()

    useEffect(() => {
        setLoading(true)
        getMovieRequest()
            .then(res => {
                if (res.data.success) {
                    setMovieRequests(res.data.results)
                    setLoading(false)
                } else {
                    setLoading(false)
                    console.log("Request Error", res.data.error)
                    alert(JSON.stringify(res.data.error))
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                alert(JSON.stringify(err))
            })
    }, [])
    const accept = (movie) => {
        setLoading(true)
        // console.log("Movie",movie)
        deleteMovieRequest(movie._id)
            .then(res => {
                if (res.data.success) {
                    // alert("")
                    
                    setMovieRequests(movieRequests.filter(item => item._id !== movie._id))
                    setLoading(false)
                    history.push("/Add Movie")
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
    const reject = (movie) => {
        setLoading(true)
        // console.log("Movie", movie)
        deleteMovieRequest(movie._id)
            .then(res => {
                if (res.data.success) {
                    // alert("")
                    setMovieRequests(movieRequests.filter(item => item._id !== movie._id))
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
                <h1 className={classes.headText}>Movie Requests</h1>
            </div>
            {movieRequests.length > 0 ?
                <Grid container spacing={3}>
                    {movieRequests.map((movieRequest, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography variant="h6" component="h3" style={{ color: 'rgba(255,255,255,0.9 )', fontWeight: 'bold' }}>
                                        {movieRequest.userName}
                                    </Typography>
                                    <Typography variant="h4" component="h1" style={{ color: '#fff', fontWeight: 'bold' }}>
                                        {movieRequest.movieName}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {new Date(movieRequest.release_Date).toISOString().split('T')[0]}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {movieRequest.cast}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {movieRequest.details}

                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        onClick={() => accept(movieRequest)}
                                        variant="contained" style={{ marginRight: 10, backgroundColor: 'rgba(41, 150, 211,0.9)', borderColor: '#2996D3', color: '#fff', fontWeight: 'bold' }} color="primary">
                                        Accept
                                    </Button>
                                    <Button
                                        onClick={() => reject(movieRequest)}
                                        variant="contained" style={{ backgroundColor: 'rgba(255,0,0,0.7)', borderColor: 'rgba(255,0,0,0.7)', color: '#fff', fontWeight: 'bold' }}>
                                        Reject
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}


                </Grid>
                :
                <div className="productTitleContainer">
                    <h1 style={{color: '#29C1C1',}}>No Movie Requests</h1>
                </div>
            }

        </div>
    );
}
