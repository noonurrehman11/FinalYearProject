import './App.css';
import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import ResponsiveDrawer from './Views/Dashboard/index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Login from './Views/Login';


const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
  listItemText: {
    fontFamily: "Montserrat",
  }
});

function App() {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(async () => {
    console.log("UseEffect")
    const id= await localStorage.getItem('id')
    if(id){
      setIsLoggedIn(true)
    }
  }, [])
  console.log("Token", token)
  return (
    <Router>
      <ThemeProvider theme={theme}>

        {!isLoggedIn ?
          <Switch>

            <Route
              exact
              path="/"

            ><Login setIsLoggedIn={setIsLoggedIn} /></Route>

          </Switch>
          :
          <ResponsiveDrawer setIsLoggedIn={setIsLoggedIn} />
        }



        <ToastContainer />

      </ThemeProvider>
    </Router>

  );
}

export default App;
