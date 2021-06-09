import React from "react";
import { withRouter } from "react-router-dom";
import CKEditor from "react-ckeditor-component";

import { Mutation } from "react-apollo";
import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from "../../queries";
import Error from "../Error";
import withAuth from "../withAuth";

const initialState = {
  name: "",
  imageUrl: "",
  instructions: "",
  category: "Breakfast",
  description: "",
  username: ""
};

class AddRecipe extends React.Component {
  state = { ...initialState };

// The purpose of this clearState and initialState stuff is to clear the fields in our input on submission. So the input on our user interface clear
// after we hit the submit button
  clearState = () => {
    this.setState({ ...initialState });
  };

// This is a life cycle method
  componentDidMount() {
    this.setState({
      username: this.props.session.getCurrentUser.username
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleEditorChange = event => {
    const newContent = event.editor.getData();
    this.setState({ instructions: newContent });
  };

  handleSubmit = (event, addRecipe) => {
    event.preventDefault();
    addRecipe().then(({ data }) => {
      this.clearState();
      this.props.history.push("/");
    });
  };

  validateForm = () => {
    const { name, imageUrl, category, description, instructions } = this.state;
    const isInvalid =
      !name || !imageUrl || !category || !description || !instructions;
    return isInvalid;
  };

  updateCache = (cache, { data: { addRecipe } }) => {
    // The query before the mutation
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });  // So each mutation is stored in the cache which is in the browsers memory
                                                                            // And in the cache, the new data from the mutation in stored in data: addRecipe
                                                                            // 6:00 mins in video 45
    
                                                                            // The cache.readQuery is all the recipes before the mutation
                                                                            // and the data: addRecipe are the new recipes from the mutation
                                                                            // all held in the cache

    // Updaing the query after the mutation
    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [addRecipe, ...getAllRecipes]  // We want the newly created recipe to come first or be on top
      }
    });
  };

  render() {
    const {
      name,
      imageUrl,
      category,
      description,
      instructions,
      username
    } = this.state;

    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{
          name,
          imageUrl,
          category,
          description,
          instructions,
          username
        }}
        refetchQueries={() => [
          { query: GET_USER_RECIPES, variables: { username } }
        ]}
        update={this.updateCache} // This is to make sure the new recipe is updated on the home page by the time we redirect there on submission
                                  // since a lot is done with the mutation in the short time that we submit and redirect
      >
        {(addRecipe, { data, loading, error }) => {
          return (
            <div className="App">
              <h2 className="main-title">Add Recipe</h2>
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, addRecipe)} // Arrow function so it doesnt execute on page load
              >
                <label htmlFor="name">Recipe Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Add Name"
                  onChange={this.handleChange}
                  value={name}
                />
                <label htmlFor="imageUrl">Recipe Image</label>
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Add Image URL"
                  onChange={this.handleChange}
                  value={imageUrl}
                />
                <label htmlFor="category">Category of Recipe</label>
                <select
                  name="category"
                  onChange={this.handleChange}
                  value={category}
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
                <label htmlFor="description">Recipe Description</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Add Description"
                  onChange={this.handleChange}
                  value={description}
                />
                <label htmlFor="instructions">Recipe Instructions</label>
                <CKEditor
                  name="instructions"
                  content={instructions}
                  events={{ change: this.handleEditorChange }}
                />
                <button
                  disabled={loading || this.validateForm()}
                  type="submit"
                  className="button-primary"
                >
                  Submit
                </button>
                {error && <Error error={error} />}
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddRecipe)
);
