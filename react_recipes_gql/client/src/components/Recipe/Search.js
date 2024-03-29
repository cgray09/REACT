import React from "react";

import { ApolloConsumer } from "react-apollo";
import { SEARCH_RECIPES } from "../../queries";
import SearchItem from "./SearchItem";

class Search extends React.Component {
  state = {
    searchResults: []
  };

// searchRecipes is destructured from the data object from the SEARCH_RECIPES query
  handleChange = ({ searchRecipes }) => {
    this.setState({
      searchResults: searchRecipes
    });
  };

  render() {
    const { searchResults } = this.state;

    return (
      <ApolloConsumer>    // ApolloConsumer allows us to perform a search by input
        {client => (
          <div className="App">
            <h2 className="main-title">Search for Recipes</h2>
            <input
              type="search"
              className="search"
              placeholder="Search"
              onChange={async event => {
                event.persist();
                const { data } = await client.query({
                  query: SEARCH_RECIPES,
                  variables: { searchTerm: event.target.value }
                });
                this.handleChange(data);
              }}
            />
            <ul>
              {searchResults.map(recipe => (
                <SearchItem key={recipe._id} {...recipe} />
              ))}
            </ul>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Search;
