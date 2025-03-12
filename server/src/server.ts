import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import { ApolloServer } from 'apollo-server-express'; //ApolloServer import
import { typeDefs, resolvers } from './Schemas/index.js';  //GraphQL type definitions and resolvers
import { contextMiddleware } from './services/auth.js'; //Context middleware for Apollo Server
const __dirname = import.meta.dirname;

const app: any = express(); 
const PORT = process.env.PORT || 3001;

//Middleware for express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware, //Use auth middleware for decoding tokens  
});



// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  console.log("Production mode");  
}
app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('*', (_req: any, res: any) =>
  res.sendFile(path.join(__dirname, '../../client/index.html'))
);

//Start Apollo Server before applying middleware
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
  db.on('error', (error) => {
    console.error("MongoDB connection error", error);
  });
};

startApolloServer();