import {makeExecutableSchema} from '@graphql-tools/schema';
import {loadSchema, UrlLoader} from 'graphql-tools';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';

import typeDefs from './schema';
import resolvers from './resolvers';
import {makeApolloServer} from './util/makeServer';

export const localSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// schema loading: url loader
async function loadRemoteSchema() {
  const postsSchema = await loadSchema('http://localhost:5001/graphql', {
    loaders: [new UrlLoader()],
  });
}

/**
 * You can chose to introspect just once and store the information in memory.
 * It may not be possible in case of lambda
 */

makeApolloServer(localSchema, 5000);
