import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Navbar from './components/Navbar';

// Create Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', 
  cache: new InMemoryCache(),
});

function App() {
  return (
      <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
      </ApolloProvider>
  );
}

export default App;
