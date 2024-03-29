import React from "react";
import "./App.css";
import posed from "react-pose";

import { Query } from "react-apollo";   // What allows us to perform queries on all of our components
import { GET_ALL_RECIPES } from "../queries";
import RecipeItem from "./Recipe/RecipeItem";
import Spinner from "./Spinner";

const RecipeList = posed.ul({
  shown: {
    x: "0%",    // This is the x position on the page
    staggerChildren: 100
  },
  hidden: {
    x: "-100%"  // This is all of the recipes being off the page
  }
});

// This was changed to a stateful component only to add the animation
class App extends React.Component {
  state = {
    on: false
  };

  componentDidMount() {
    setTimeout(this.slideIn, 200);
  }

  slideIn = () => {
    this.setState({ on: !this.state.on });
  };

  render() {
    return (
      <div className="App">
        <h1 className="main-title">
          Find Recipes You <strong>Love</strong>
        </h1>
        <Query query={GET_ALL_RECIPES}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />;
            if (error) return <div>Error</div>;
            const { on } = this.state;
            return (
              // This pose makes the recipes on the homepage come on the page with a bouncing animation effect
              <RecipeList pose={on ? "shown" : "hidden"} className="cards">
                {data.getAllRecipes.map(recipe => (
                  <RecipeItem key={recipe._id} {...recipe} />
                ))}
              </RecipeList>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default App;
