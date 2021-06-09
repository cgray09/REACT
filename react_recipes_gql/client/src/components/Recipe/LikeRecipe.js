import React from "react";

import { Mutation } from "react-apollo";
import { LIKE_RECIPE, UNLIKE_RECIPE, GET_RECIPE } from "../../queries";
import withSession from "../withSession";

class LikeRecipe extends React.Component {
  state = {
    liked: false,
    username: ""
  };

  componentDidMount() {
    // this.props comes from the withSession
    if (this.props.session.getCurrentUser) {
      const { username, favorites } = this.props.session.getCurrentUser;
      const { _id } = this.props;
      // This prevents us from liking a recipe more than once
      const prevLiked =
        favorites.findIndex(favorite => favorite._id === _id) > -1;
      this.setState({
        liked: prevLiked,
        username
      });
    }
  }

  handleClick = (likeRecipe, unlikeRecipe) => {
    this.setState(
      prevState => ({
        liked: !prevState.liked   // If we liked it we want it to be the opposite of what it previous was
      }),
      () => this.handleLike(likeRecipe, unlikeRecipe) // This will be called automatically with it when clicked
    );
  };

  handleLike = (likeRecipe, unlikeRecipe) => {
    if (this.state.liked) {
      likeRecipe().then(async ({ data }) => {
        await this.props.refetch();   // Will refetch our get currentUser query
      });
    } else {
      unlikeRecipe().then(async ({ data }) => {
        await this.props.refetch();
      });
    }
  };

  updateLike = (cache, { data: { likeRecipe } }) => {
    const { _id } = this.props;
    // This process w/ the cache is called optimistic ui
    const { getRecipe } = cache.readQuery({
      query: GET_RECIPE,  // when we like a recipe it will be added to the parent component since it houses the recipe
      variables: { _id }  // so that is the query that we want to update
    });

    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id },
      data: {
        getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 }
      }
    });
  };

  updateUnlike = (cache, { data: { unlikeRecipe } }) => {
    const { _id } = this.props;
    const { getRecipe } = cache.readQuery({
      query: GET_RECIPE,
      variables: { _id }
    });

    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id },
      data: {
        getRecipe: { ...getRecipe, likes: unlikeRecipe.likes - 1 }
      }
    });
  };

  render() {
    const { liked, username } = this.state;
    const { _id } = this.props;   // This _id comes from the parent page, RecipePage which passes it in as a prop
    return (
      <Mutation
        mutation={UNLIKE_RECIPE}
        variables={{ _id, username }}
        update={this.updateUnlike}
      >
        {unlikeRecipe => (  // By going straight to a parenthesis it will return automatically instead writing return
          <Mutation
            mutation={LIKE_RECIPE}
            variables={{ _id, username }}
            update={this.updateLike}
          >
            {likeRecipe =>
              username && (
                <button
                  className="like-button"
                  onClick={() => this.handleClick(likeRecipe, unlikeRecipe)}
                >
                  {liked ? "Unlike" : "Like"}
                </button>
              )
            }
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default withSession(LikeRecipe);
