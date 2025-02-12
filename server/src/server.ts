import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
//import routes from './routes/index.js';
import { ApolloServer } from 'apollo-server-express'; //ApolloServer import
import { typeDefs } from './schemas';  //GraphQL type definitions
import { resolvers } from './resolvers/schemas'; //GraphQL resolvers
import { contextMiddleware } from './services/auth.js'; //Context middleware for Apollo Server


const app = express();
const PORT = process.env.PORT || 3001;

//Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware, //Use auth middleware for decoding tokens
  // context: ({ req}) => {
  //   //Extract token from headers for authentication
  //   const token = req.headers.authorization || '';
  //   return { token }; //Pass token to context for resolvers
  // }
});

//Apply Apollo Server middleware Express app
//server.applyMiddleware({ app });

//Middleware for express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//Start Apollo Server vefore applying middleware
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer();


//app.use(routes);

//Connect to the database and start the server
// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });
