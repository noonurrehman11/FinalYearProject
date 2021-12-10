import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Button, TextField, Grid, Avatar, makeStyles, Typography, MenuItem } from '@material-ui/core';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from 'react';
import { addMovie, getMovieById, updateMovieById } from '../../Services/movies';
import Loader from '../../components/Loader';
import { useHistory, useParams } from 'react-router';
const useStyles = makeStyles({
    root: {
        '& label.Mui-focused': {
            color: '#29C1C1',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#29C1C1',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#29C1C1',
            },
            '&:hover fieldset': {
                borderColor: '#29C1C1',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#29C1C1',
            },
        },
    },
    DialogBox: {
        borderRadius: "30px",
        background: "#fff",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    sameinfont: {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#29C1C1",
        textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    },
    DEDialpos: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
    avatar: {
        width: "100px",
        height: "100px",
        marginTop: "10px",
        marginBottom: "20px",
    },
    button: {
        width: "100%",
        borderRadius: "20px",
        background: "#29C1C1",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        color: "white",
        marginTop: "10px",
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: '#2996D3',

        },
    },
    multilineColor: {
        color: "#29C1C1",
    },
    colorPrimary: {
        color: "#29C1C1",
    }
});



// write function to upload file to firebase storage





export default function EditMovie() {
    const [loading, setLoading] = useState(false)
    const [movieLoading, setMovieLoading] = useState(false)
    const [percentage, setPercentage] = useState(0)
    const [movieInfo, setMovieInfo] = useState({})

    const { id } = useParams()
    const history = useHistory()


    const classes = useStyles();

    useEffect(() => {
        console.log("Useeffct")
        setMovieLoading(true)
        getMovieById(id)
            .then(res => {
                if (res.data.success) {
                    console.log(res.data)
                    console.log(new Date(res.data.resp.releaseDate).toISOString().substring(0, 10))
                    setMovieInfo(res.data.resp)
                    setMovieLoading(false)
                }
            })
            .catch(err => {
                console.log(err)
                setMovieLoading(false)
            })
    }, [])



    const uploadTrailer = (e, handleChange, errors) => {
        e.preventDefault()

        console.log(e.target.files[0])
        let fileName = e.target.files[0].name;
        fileName = fileName + new Date();
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setPercentage(parseInt(progress))
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        setLoading(true)
                        // handleChange('picture')()
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setLoading(false)
                    handleChange(downloadURL)
                });
            }
        );
    }

    const options = [
        {
            value: true,
            label: 'Yes',
        },
        {
            value: false,
            label: 'No',
        },
    ]
    const movieOptions = [
        {
            value: 'Comedy',
            label: 'Comedy',
        },
        {
            value: 'Action',
            label: 'Action',
        },
        {
            value: 'Horror',
            label: 'Horror',
        },
    ]
    if (movieLoading) {
        return <Loader />
    }

    return (

        <div style={{}}>
            <Formik
                initialValues={{
                    name: movieInfo.name,
                    releaseDate: movieInfo.releaseDate ? new Date(movieInfo.releaseDate).toISOString().substring(0, 10) : "",
                    picture: movieInfo.picture,
                    trailerLink: movieInfo.trailerLink,
                    movieLink: movieInfo.movieLink,
                    summary: movieInfo.summary,
                    status: movieInfo.status,
                    cast: movieInfo.cast,
                    genre: movieInfo.genre,
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required('Title is required'),
                    releaseDate: Yup.date().required('Release date is required'),
                    picture: Yup.string().required('Thumbnail is required'),
                    trailerLink: Yup.string(),
                    movieLink: Yup.string().required('Movie is required'),
                    summary: Yup.string().required('Summary is required'),
                    status: Yup.boolean().required('Status is required'),
                    cast: Yup.string().required('Cast is required'),
                    genre: Yup.string().required('Genre is required'),

                })}
                onSubmit={(values) => {

                    console.log(values)
                    updateMovieById(id, { ...values, views: movieInfo.views })
                        .then(res => {
                            if (res.data.success) {
                                console.log(res.data)
                                alert("Movie updated successfully")
                                history.goBack()

                            }
                            else {
                                console.log(res.data)
                                alert("Movie update error")
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            alert("Movie update error")
                        })

                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    handleError,
                    handleReset
                    /* and other goodies */
                }) => (
                    <Form>
                        {loading ?
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <CircularProgress size={100} classes={{ colorPrimary: classes.colorPrimary }} />
                                    <Typography variant='h5' style={{ color: '#29C1C1', fontWeight: 'bold', paddingTop: 20 }}>
                                        Uploading {percentage}% done
                                    </Typography>

                                </div>
                            </div>
                            :

                            <item item xs={12} className={classes.DialogBox}>
                                <Typography style={{ fontSize: "30px" }} className={classes.sameinfont}>
                                    EDIT MOVIE INFO
                                </Typography>


                                <Grid container className={classes.DEDialpos} spacing={2} >
                                    <Grid container xs={11} sm={6} md={4} style={{ marginTop: "30px", padding: '0px 10px' }}>

                                        <Field name="name" fullWidth type="text" variant="outlined" as={TextField}
                                            label="Enter Title" color="Primary" required
                                            className={classes.root}
                                            InputProps={{
                                                className: classes.multilineColor
                                            }}
                                            helperText={<div style={{ color: "red" }}>
                                                <ErrorMessage name="name" /></div>}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container xs={11} sm={6} md={4} style={{ marginTop: "30px", padding: '0px 10px' }}>

                                    <Field name="cast" label="Enter cast"
                                        fullWidth type="text" variant="outlined" as={TextField}
                                        color="Primary" required
                                        className={classes.root}
                                        InputProps={{
                                            className: classes.multilineColor
                                        }}
                                        helperText={
                                            <div style={{ color: "red" }}>
                                                <ErrorMessage name="cast" /></div>}
                                    />
                                </Grid>
                                <Grid container xs={11} sm={6} md={4} style={{ marginTop: "30px", padding: '0px 10px' }}>

                                    <Field name="releaseDate" fullWidth type="date" variant="outlined" as={TextField}
                                        color="Primary" required
                                        className={classes.root}
                                        InputProps={{
                                            className: classes.multilineColor
                                        }}
                                        helperText={<div style={{ color: "red" }}>
                                            <ErrorMessage name="releaseDate" /></div>}
                                    />
                                </Grid>
                                <Grid container xs={11} sm={6} md={4} style={{ marginTop: "30px", padding: '0px 10px' }}>

                                    <Field name="summary" as={TextField} fullWidth type="text"
                                        label="Enter Summary"
                                        id="outlined-multiline-static"
                                        rows={4}
                                        multiline
                                        defaultValue="Default Value"
                                        variant="outlined"
                                        color="Primary" required
                                        className={classes.root}
                                        InputProps={{
                                            className: classes.multilineColor
                                        }}
                                        helperText={<div style={{ color: "red" }}>
                                            <ErrorMessage name="summary" /></div>}
                                    />
                                </Grid>


                                <Grid container xs={11} sm={6} md={3} style={{ marginTop: "20px" }}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        color="primary"
                                        className={classes.button}
                                    >
                                        Upload Thumbnail
                                        <input
                                            type="file"
                                            onChange={(e) => {
                                                console.log(e.target.files[0])
                                                uploadTrailer(e, handleChange('picture'), errors)
                                            }}
                                            hidden
                                        />
                                    </Button>
                                    {errors.picture ?
                                        <div style={{ color: "red" }}>
                                            {errors.picture}
                                        </div>
                                        : null
                                    }
                                </Grid>
                                <Grid container xs={11} sm={6} md={3} style={{ marginTop: "20px" }}>

                                    <Button
                                        variant="contained"
                                        component="label"
                                        color="primary"
                                        className={classes.button}
                                    >
                                        Upload Trailer
                                        <input
                                            type="file"
                                            onChange={(e) => {
                                                console.log(e.target.files[0])
                                                uploadTrailer(e, handleChange('trailerLink'), errors)
                                            }}
                                            hidden
                                        />
                                    </Button>
                                    {errors.trailerLink ?
                                        <div style={{ color: "red" }}>
                                            {errors.trailerLink}
                                        </div>
                                        : null
                                    }
                                </Grid>
                                <Grid container xs={11} sm={6} md={3} style={{ marginTop: "20px" }}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        color="primary"
                                        className={classes.button}
                                    >
                                        Upload Movie
                                        <input
                                            type="file"
                                            onChange={(e) => {
                                                console.log(e.target.files[0])
                                                uploadTrailer(e, handleChange('movieLink'), errors)
                                            }}
                                            hidden
                                        />
                                    </Button>
                                    {errors.movieLink ?
                                        <div style={{ color: "red" }}>
                                            {errors.movieLink}
                                        </div>
                                        : null
                                    }
                                </Grid>
                                <Grid container xs={11} sm={6} md={4} style={{ marginTop: "20px" }}>

                                    <Field
                                        id="outlined-select-currency"
                                        select
                                        label="Status"
                                        name="status" as={TextField} fullWidth
                                        fullWidth
                                        variant="outlined"
                                        color="Primary"
                                        required
                                        className={classes.root}
                                        InputProps={{
                                            className: classes.multilineColor
                                        }}
                                        helperText={<div style={{ color: "red" }}>
                                            <ErrorMessage name="status" /></div>}
                                    >
                                        {options.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Field>

                                </Grid>
                                <Grid container xs={11} sm={6} md={4} style={{ marginTop: "20px" }}>

                                    <Field
                                        id="outlined-select-currency"
                                        select
                                        label="Genre"
                                        name="genre" as={TextField} fullWidth
                                        fullWidth
                                        variant="outlined"
                                        color="Primary"
                                        required
                                        className={classes.root}
                                        InputProps={{
                                            className: classes.multilineColor
                                        }}
                                        helperText={<div style={{ color: "red" }}>
                                            <ErrorMessage name="genre" /></div>}
                                    >
                                        {movieOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Field>

                                </Grid>
                                <Grid container xs={11} sm={6} md={3} style={{ marginTop: "30px", padding: '0px 10px' }}>
                                    <Button
                                        className={classes.button}
                                        type='submit'
                                    >Save</Button>
                                </Grid>
                            </item>}
                    </Form>
                )}
            </Formik>
        </div>

    );
}

