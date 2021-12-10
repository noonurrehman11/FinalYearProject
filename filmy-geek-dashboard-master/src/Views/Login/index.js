import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Lock from '@material-ui/icons/Lock';
import Mail from '@material-ui/icons/Mail';
import { login } from '../../Services/Auth';



const theme = createMuiTheme({
    palette: {
        primary: { main: '#29C1C1' },
        secondary: { main: '#2996D3' },
    }
});

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px',
        backgroundColor: 'white',
        borderradius: '4px',
        boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
    },
    inputF: {

    },
    avatar: {
        margin: theme.spacing(2),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    signup: {
        margin: theme.spacing(-2, 0, 2),
    },
}));

export default function Login({setIsLoggedIn}) {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async(e) => {
        e.preventDefault();
        console.log(email, password);
        if(email.length > 0 && password.length > 0){
            console.log('success');
            const resp=await login({email, password})
            console.log(resp)
            if(resp.success){
                if(resp.results.isAdmin){
                    console.log("DONE")
                    await localStorage.setItem('id', resp.results._id);
                    setIsLoggedIn(true);
                } else{
                    alert("You are not an admin")
                }
            } else{
                console.log('error')
                alert (resp.error)
            }
        } else{
            alert('Please fill all the fields');
        }
    }

    return (

        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                </Grid>
                <Typography component="div">
                    <Box fontSize={30} fontWeight={600} m={-2}>
                        SIGN IN
                    </Box>
                </Typography>
                <Typography component="div">
                    <Box fontSize={16} m={1} paddingT>
                        Sign into Admin Account
                    </Box>
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={9}>
                            <TextField
                                className={classes.inputF}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                autoFocus
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><Mail color="disabled" /></InputAdornment>,
                                }}
                            />
                        </Grid>

                        <Grid item xs={9}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                autoComplete="current-password"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><Lock color="disabled" /></InputAdornment>,
                                }}
                            />
                        </Grid>

                        <Grid item xs={9}>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                        </Grid>

                        <Grid item xs={9} >
                            <Button
                                
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                                m={0}
                                onClick={submit}
                            >
                                Sign In
                            </Button>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2" color="secondary" >
                                Forgot your password?
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}