import React from "react";
import { Link } from "react-router-dom";

import { Query, Mutation } from "react-apollo";
import {
  GET_USER_RECIPES,
  DELETE_USER_RECIPE,
  GET_ALL_RECIPES,
  GET_CURRENT_USER,
  UPDATE_USER_RECIPE
} from "../../queries";
import Spinner from "../Spinner";

// Made it a stateful functional component only so we could
// have a state, so we could make updates on the recipes
class UserRecipes extends React.Component {
  state = {
    _id: "",
    name: "",
    imageUrl: "",
    category: "",
    description: "",
    modal: false
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleDelete = deleteUserRecipe => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (confirmDelete) {
      deleteUserRecipe().then(({ data }) => {
      });
    }
  };

  handleSubmit = (event, updateUserRecipe) => {
    event.preventDefault();   // To prevent from reloading the page after submit
    updateUserRecipe().then(({ data }) => {
      this.closeModal();
    });
  };

  loadRecipe = recipe => {
    this.setState({ ...recipe, modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  render() {
    const { username } = this.props;
    const { modal } = this.state;
    
    return (
      <Query query={GET_USER_RECIPES} variables={{ username }}>
        {({ data, loading, error }) => {
          if (loading) return <Spinner />;
          if (error) return <div>Error</div>;
          
          return (
            <ul>
              {modal && (
                <EditRecipeModal
                  handleSubmit={this.handleSubmit}
                  recipe={this.state}                   // We are literally passing our state directly into the edit modal.
                  closeModal={this.closeModal}          // that way we can update the states values
                  handleChange={this.handleChange}
                />
              )}
              <h3>Your Recipes</h3>
              {!data.getUserRecipes.length && (
                <p>
                  <strong>You have not added any recipes yet</strong>
                </p>
              )}
              {data.getUserRecipes.map(recipe => (
                <li key={recipe._id}>
                  <Link to={`/recipes/${recipe._id}`}>
                    <p>{recipe.name}</p>
                  </Link>
                  <p style={{ marginBottom: "0" }}>Likes: {recipe.likes}</p>
                  <Mutation
                    mutation={DELETE_USER_RECIPE}
                    variables={{ _id: recipe._id }}
                    // This makes sure that the other components get fresh data as well when a recipe is deleted
                    refetchQueries={() => [
                      { query: GET_ALL_RECIPES },
                      { query: GET_CURRENT_USER } // To refresh favorites, incase a favorite is deleted
                    ]}
                    // This update is how we update the ui when a recipe is deleted
                    update={(cache, { data: { deleteUserRecipe } }) => {
                      const { getUserRecipes } = cache.readQuery({
                        query: GET_USER_RECIPES,
                        variables: { username }
                      });

                      cache.writeQuery({
                        query: GET_USER_RECIPES,
                        variables: { username },
                        data: {
                          getUserRecipes: getUserRecipes.filter(
                            recipe => recipe._id !== deleteUserRecipe._id
                          )
                        }
                      });
                    }}
                  >
                    {(deleteUserRecipe, attrs = {}) => (
                      <div>
                        <button
                          className="button-primary"
                          onClick={() => this.loadRecipe(recipe)}   // recipe is passed in to have the input values of
                        >                                           // the modal filled in for editing
                          Update
                        </button>
                        <p
                          className="delete-button"
                          onClick={() => this.handleDelete(deleteUserRecipe)}
                        >
                          {attrs.loading ? "deleting..." : "X"}
                        </p>
                      </div>
                    )}
                  </Mutation>
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

const EditRecipeModal = ({
  handleSubmit,
  recipe,
  handleChange,
  closeModal
}) => (
  <Mutation
    mutation={UPDATE_USER_RECIPE}
    // Passing the variables as parameters to the UPDATE_USER_RECIPE query we created in index.js in queries folder
    variables={{
      _id: recipe._id,
      name: recipe.name,
      imageUrl: recipe.imageUrl,
      category: recipe.category,
      description: recipe.description
    }}
  >
    {updateUserRecipe => (
      <div className="modal modal-open">
        <div className="modal-inner">
          <div className="modal-content">
            <form
              onSubmit={event => handleSubmit(event, updateUserRecipe)}
              className="modal-content-inner"
            >
              <h4>Edit Recipe</h4>

              <label htmlFor="name">Recipe Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}   // Just handleChange since this is a stateless functional component
                value={recipe.name}
              />
              <label htmlFor="imageUrl">Recipe Image</label>
              <input
                type="text"
                name="imageUrl"
                onChange={handleChange}
                value={recipe.imageUrl}   // The recipe is the data returned from the GET_USER_RECIPES query in our
              />                          // index.js in queries and getUserRecipes function
              <label htmlFor="category">Category of Recipe</label>
              <select
                name="category"
                onChange={handleChange}
                value={recipe.category}
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
                onChange={handleChange}
                value={recipe.description}
              />

              <hr />
              <div className="modal-buttons">
                <button type="submit" className="button-primary">
                  Update
                </button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
  </Mutation>
);

export default UserRecipes;
