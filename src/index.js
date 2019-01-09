import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { Query, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import Pages from './pages';
import Login from './pages/login';
import {InMemoryCache} from 'apollo-cache-inmemory';
import injectStyles from './styles';


const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const cache = new InMemoryCache();


const client = new ApolloClient({
  cache,
  headers: {
    authorization: localStorage.getItem('token')
  },
  uri: "https://fullstack-tutorial-server-axgxsozikg.now.sh/",
  initializers: {
    isLoggedIn: () => !!localStorage.getItem('token'),
    cartItems: () => [],
  }
});

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={IS_LOGGED_IN}>
      {({ data }) => (data.isLoggedIn ? <Pages /> : <Login />)}
    </Query>
  </ApolloProvider>,
  document.getElementById('root'));