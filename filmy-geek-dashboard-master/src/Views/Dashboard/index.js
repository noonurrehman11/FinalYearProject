import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import drawerlogo from "../../assets/fg.png";
import movieIcon from "../../assets/video.png";
import requestIcon from "../../assets/cash-payment.png";
import userIcon from "../../assets/user.png";
import subscriptionIcon from "../../assets/subscription.png";
import complainIcon from "../../assets/report.png";
import chatIcon from "../../assets/messenger.png";
import logoutIcon from "../../assets/logout.png";
import { Route, Switch, Link } from "react-router-dom";
import Home from "./../Home/index";

import { Paper } from "@material-ui/core";
import Users from "../Users";
import Movies from "../Movies";
import Subscriptions from "../Subscriptions";
import MoviesRequest from "../MoviesRequest";
import Complaints from "../Complaints";
import Chats from "../Chats";
import NewMovie from "../NewMovie";
import EditMovie from "../EditMovie";
import Login from "../Login";

const drawerWidth = 265;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "rgba(41, 193, 193,0.2)",
    flex: 1,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      display: "none",
      colorPrimary: "linear-gradient(#99E4E4 0%, #29C1C1 16%, #2996D3 100%)",
      background:
        "linear-gradient(90deg,#99E4E4 0%, #29C1C1 16%, #2996D3 100%)",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: "linear-gradient(#99E4E4 0%, #29C1C1 16%, #2996D3  100%)",
    // borderRadius: "0px 30px 30px 0px"
    // border: "0px 10px, 0px 0px"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
  },

  listItemText: {
    color: "#fff",
    fontWeight: "900",
    // backgroundColor:"red",
    fontSize: "0.9rem",
    "&:hover": {
      color: "#fff",
    },
    marginLeft: "20px",
    paddingTop: "10px",
  },
  listItem: {
    // backgroundColor: "#39C9C9",
    // boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    width: "100%",
    marginTop: 20,
    paddingLeft: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // textAlign: "center",
  },
  divider: {
    borderRadius: 0,
    width: "85%",
    background: "#fff",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    margin: "auto",
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Link to={`/`} style={{ textDecoration: "none" }}>
        <img
          src={drawerlogo}
          alt="Safe Citizen Life"
          style={{ width: "90%", marginTop: "0px", marginBottom: "0px" }}
        />
      </Link>
      <Divider className={classes.divider} />
      <List>
        {[
          "USERS",
          "MOVIES",
          "MOVIE REQUESTS",
          "SUBSCRIPTIONS",
          "COMPLAINTS",
          "CHATS",
          "LOGOUT",
        ].map((text, index) => (
          <>
            {index === 6 ? (
              <Link
                key={index}
                to={"/"}
                style={{
                  border: "none",
                  background: "transparent",
                  padding: 0,
                  textDecoration: "none",
                }}
                onClick={() => {
                  props.setIsLoggedIn(false);
                  localStorage.removeItem("id");
                }}
              >
                <ListItem
                  button
                  className={classes.listItem}
                  style={{ paddingRight: 180 }}
                >
                  {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>    */}
                  <img
                    src={logoutIcon}
                    style={{
                      width: "20px",
                      height: "20px",
                      paddingRight: "0px",
                    }}
                  />

                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        className={classes.listItemText}
                      >
                        {text}
                      </Typography>
                    }
                  />
                </ListItem>
              </Link>
            ) : (
              <Link
                key={index}
                to={`/${text}`}
                style={{ textDecoration: "none" }}
              >
                <ListItem button key={index} className={classes.listItem}>
                  {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>    */}
                  {/* <Paper> */}
                  {index === 0 ? (
                    <img
                      src={userIcon}
                      style={{
                        width: "20px",
                        height: "20px",
                        paddingRight: "0px",
                      }}
                    />
                  ) : index === 1 ? (
                    <img
                      src={movieIcon}
                      style={{
                        width: "20px",
                        height: "20px",
                        paddingRight: "0px",
                      }}
                    />
                  ) : index === 2 ? (
                    <img
                      src={requestIcon}
                      style={{
                        width: "20px",
                        height: "20px",
                        paddingRight: "0px",
                      }}
                    />
                  ) : index === 3 ? (
                    <img
                      src={subscriptionIcon}
                      style={{
                        width: "20px",
                        height: "20px",
                        paddingRight: "0px",
                      }}
                    />
                  ) : index === 4 ? (
                    <img
                      src={complainIcon}
                      style={{
                        width: "20px",
                        height: "20px",
                        paddingRight: "0px",
                      }}
                    />
                  ) : (
                    <img
                      src={chatIcon}
                      style={{
                        width: "20px",
                        height: "20px",
                        paddingRight: "0px",
                      }}
                    />
                  )}
                  {/* </Paper> */}
                  {/* <Avatar alt="Remy Sharp" src={movieIcon} /> */}
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        className={classes.listItemText}
                      >
                        {text}
                      </Typography>
                    }
                  />
                </ListItem>
              </Link>
            )}
          </>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{
          background:
            "linear-gradient(90deg,#99E4E4 0%, #29C1C1 16%, #2996D3 100%)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/USERS" component={Users} />
          <Route path="/MOVIES" component={Movies} />
          <Route path="/SUBSCRIPTIONS" component={Subscriptions} />
          <Route path="/MOVIE REQUESTS" component={MoviesRequest} />
          <Route path="/COMPLAINTS" component={Complaints} />
          <Route path="/Chats" component={Chats} />
          <Route path="/Add Movie" component={NewMovie} />
          <Route path="/editMovie/:id" component={EditMovie} />
        </Switch>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
