import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./index.css";

import App from "./components/App";
import Navbar from "./components/Navbar";
import withSession from "./components/withSession";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Search from "./components/Recipe/Search";
import AddRecipe from "./components/Recipe/AddRecipe";
import RecipePage from "./components/Recipe/RecipePage";
import Profile from "./components/Profile/Profile";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// How we connect our frontend with our backend
const client = new ApolloClient({
  uri: "https://react-recipes-gql.herokuapp.com/graphql",
  // Send our token to our backend
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    // if (networkError) {
    //   localStorage.setItem("token", "");
    // }
  }
});

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>  // Since router can only have one child, used fragment for switch and navbar
      <Navbar session={session} />  // Session to check the current state of our user
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/search" component={Search} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Route
          path="/recipe/add"
          render={() => <AddRecipe session={session} />}
        />
        <Route path="/recipes/:_id" component={RecipePage} />
        <Route path="/profile" render={() => <Profile session={session} />} />
        <Redirect to="/" />   // Will redirect here if any route doesnt match 
      </Switch>
    </Fragment>
  </Router>
);

// So what ever component is being rendered at the time will go through this withSeesion to have access to the current user
const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>  // Wrap our components in Apollo so they can perform mutations and queries
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById("root")
);
