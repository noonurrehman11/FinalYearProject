import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { authenticatedUser,  update_Email, update_Password } from "../../Services/auth";
import Alert from "../../components/Alert";

const useStyles = makeStyles({
    DialogBox: {
        width: "100%",
        borderRadius: "30px",
        background: "#fff",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    sameinfont: {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#00b59c",
        textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    },
    DEDialogBox: {
        width: "100%",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
        padding: "20px",
        marginTop: "10px",
    },
    DEDial: {
        width: "100%",
        borderRadius: "20px",
        background: "#00b59c",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        color: "white",
        marginTop: "10px",
    },
    Glucoselevel: { width: "100%" },
    radiopos: {
        display: "flex",
        justifyContent: "space-around",
        textAlign: "center",
    },
    radiosize: {
        marginTop: "16px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    radiogrp: { display: "flex", flexDirection: "row" },
    DEDialpos: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
});
export default function Settings() {

    const [loading, setLoading] = useState(false)

    const classes = useStyles();
    let emailSchema = yup.object().shape({
        email: yup.string().email('Invalid email ').required('Email is required'),
        password: yup.string().min(6, 'Password must at least 6 characters long ').max(20, 'Password must be between 6-20 characters').required('Password is required'),
    });
    let passwordSchema = yup.object().shape({
        oldPassword: yup.string()
            .min(6, 'Password must at least 6 characters long ')
            .max(20, 'Password must be between 6-20 characters')
            .required('Password is required'),
        password: yup.string()
            .min(6, 'Password must at least 6 characters long ')
            .max(20, 'Password must be between 6-20 characters')
            .required('Password is required'),
        confirmPassword: yup.string()
            .min(6, 'Password must at least 6 characters long ')
            .max(20, 'Password must be between 6-20 characters')
            .required('Password is required')
            .oneOf([yup.ref('password'), null], 'Passwords must match'),

    });


    return (
        <div className="dashdiv">
            <Grid item xs={12} className={classes.DialogBox}>
                <Typography style={{ fontSize: "30px" }} className={classes.sameinfont}>
                    ADMIN SETTINGS
                </Typography>
                <Grid container style={{ marginTop: "50px" }}>
                    <Typography
                        style={{ fontSize: "28px" }}
                        className={classes.sameinfont}
                    >
                        CHANGE EMAIL
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.DEDialogBox}>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validationSchema={emailSchema}
                        onSubmit={(values,{resetForm}) => {
                            console.log(values);
                            setLoading(true)
                            authenticatedUser(values.password)
                                .then(() => {
                                    update_Email(values.email)
                                        .then(() => {
                                            console.log("Email Updated")
                                            setLoading(false)
                                            resetForm()
                                            Alert("Email Updated", "", "success", "Ok", "#00b59c")
                                        })
                                        .catch((error) => {
                                            // console.log(error?.message)
                                            setLoading(false)
                                            Alert("Email Update Failed", error?.message)
                                        })
                                })
                                .catch((error) => {
                                    // console.log(error?.message)
                                    setLoading(false)
                                    Alert("Email Update Failed", error?.message)
                                })
                        }}
                    >
                        <Form>
                            <Grid container className={classes.DEDialpos}>
                                <Grid item xs={11} md={5} style={{ marginTop: "5px" }}>
                                    <Field
                                        name="email"
                                        // InputLabelProps={{
                                        //     shrink: true,
                                        // }}
                                        className={classes.Glucoselevel}
                                        type="email"
                                        as={TextField}
                                        label="Email"
                                        color="secondary"
                                        required
                                        helperText={
                                            <div style={{ color: "red" }}>
                                                <ErrorMessage name="email" />
                                            </div>}
                                    />

                                </Grid>
                                <Grid item xs={11} md={4} style={{ marginTop: "5px" }}>
                                    <Field
                                        name="password"
                                        // InputLabelProps={{
                                        //     shrink: true,
                                        // }}
                                        className={classes.Glucoselevel}
                                        type="password"
                                        as={TextField}
                                        label="Password"
                                        color="secondary"
                                        required
                                        helperText={
                                            <div style={{ color: "red" }}>
                                                <ErrorMessage name="password" />
                                            </div>}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={2}>
                                    <Button className={classes.DEDial}
                                        type="submit"
                                    >UPDATE</Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </Grid>
                <Grid container style={{ marginTop: "50px" }}>
                    <Typography
                        style={{ fontSize: "28px" }}
                        className={classes.sameinfont}
                    >
                        CHANGE PASSWORD
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.DEDialogBox}>
                    <Formik
                        initialValues={{
                            oldPassword: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={passwordSchema}
                        onSubmit={(values,{resetForm}) => {
                            console.log(values);
                            setLoading(true)
                            authenticatedUser(values.oldPassword)
                                .then(() => {
                                    update_Password(values.password)
                                        .then(() => {
                                            // console.log("Password Updated")
                                            setLoading(false)
                                            resetForm()
                                            Alert("Password Updated", "", "success", "Ok", "#00b59c")
                                        })
                                        .catch((error) => {
                                            // console.log(error?.message)
                                            setLoading(false)
                                            Alert("Password Update Failed", error?.message)
                                        })
                                })
                                .catch((error) => {
                                    // console.log(error?.message)
                                    setLoading(false)
                                    Alert("Password Update Failed", error?.message)
                                })
                        }}
                    >
                        <Form>
                            <Grid container className={classes.DEDialpos}>
                                <Grid item xs={11} md={3} style={{ marginTop: "5px" }}>
                                    <Field
                                        name="oldPassword"
                                        // InputLabelProps={{
                                        //     shrink: true,
                                        // }}
                                        className={classes.Glucoselevel}
                                        type="password"
                                        as={TextField}
                                        label="Old Password"
                                        color="secondary"
                                        required
                                        helperText={
                                            <div style={{ color: "red" }}>
                                                <ErrorMessage name="oldPassword" />
                                            </div>}
                                    />
                                </Grid>
                                <Grid item xs={11} md={3} style={{ marginTop: "5px" }}>
                                    <Field
                                        name="password"
                                        // InputLabelProps={{
                                        //     shrink: true,
                                        // }}
                                        className={classes.Glucoselevel}
                                        type="password"
                                        as={TextField}
                                        label="Password"
                                        color="secondary"
                                        required
                                        helperText={
                                            <div style={{ color: "red" }}>
                                                <ErrorMessage name="password" />
                                            </div>}
                                    />
                                </Grid>
                                <Grid item xs={11} md={3} style={{ marginTop: "5px" }}>
                                    <Field
                                        name="confirmPassword"
                                        // InputLabelProps={{
                                        //     shrink: true,
                                        // }}
                                        className={classes.Glucoselevel}
                                        type="password"
                                        as={TextField}
                                        label="Confirm Password"
                                        color="secondary"
                                        required
                                        helperText={
                                            <div style={{ color: "red" }}>
                                                <ErrorMessage name="confirmPassword" />
                                            </div>}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={2}>
                                    <Button className={classes.DEDial}
                                        type='submit'
                                    >UPDATE</Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </Grid>
            </Grid>
        </div>
    );
}