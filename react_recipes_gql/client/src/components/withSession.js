import React from "react";

import { Query } from "react-apollo";
import { GET_CURRENT_USER } from "../queries";

// This is a higher order component
const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, refetch }) => {
      if (loading) return null;
      return <Component {...props} refetch={refetch} session={data} />;   // This is where the refetch is passed to all components
    }}
  </Query>
);

export default withSession;
