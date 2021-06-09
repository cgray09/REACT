import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Spinner from "./Spinner";
import registerServiceWorker from "./registerServiceWorker";
import firebase from "./firebase";

import "semantic-ui-css/semantic.min.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import { createStore } from "redux";
import { Provider, connect } from "react-redux"; // connect - allows us to connect our state
                                                 // to a given component
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { setUser, clearUser } from "./actions";

// rootReducer - adds our entire state to our store
const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      // will redirect to homepage on login
      // this is a listener so even if you tried to 
      // visit register or login manually after
      // authenticated will be redirected
      if (user) {
        // console.log(user);

        // this is calling the action
        this.props.setUser(user); // puts the action on the props object of the
                                  // component (wrapped w/ connect at bottum of
                                  // this page)
        this.props.history.push("/");
      } else {
        this.props.history.push("/login");
        this.props.clearUser(); // this is calling the action
      }
    });
  }

  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}

const mapStateFromProps = state => ({
  isLoading: state.user.isLoading
});

// needed to redirect the user (like after login)
const RootWithAuth = withRouter(
  connect(    // connect imported from above
    mapStateFromProps,
    { setUser, clearUser }  // our actions
  )(Root)
);

ReactDOM.render(
  // <Provider store={store}> gives us our global state w/ redux
  <Provider store={store}>  
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
