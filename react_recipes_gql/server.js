const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });
const Recipe = require("./models/Recipe");
const User = require("./models/User");

// Bring in GraphQL-Express middleware
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

// Create schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Connects to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

// Initializes application
const app = express();

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true
// };
app.use(cors("*"));   // Had to use cors to connect our frontend to our backend in development

// Set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
  if (token !== "null") {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

// Create GraphiQL application
// app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Connect schemas with GraphQL
// This is our GraphQL Express middleware
// Sends our data to the resolvers
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    // The context is what makes it available in our resolvers file
    context: {
      Recipe,
      User,
      currentUser   // The currentUser comes from our token which comes from our client to the server. Thats what happens in the JWT authentication middleware.
    }
  }))
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
