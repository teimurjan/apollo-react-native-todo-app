import React from 'react';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import Main from './src/index';

export default () => {
  const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:8080/graphql' }),
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  });
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
};
