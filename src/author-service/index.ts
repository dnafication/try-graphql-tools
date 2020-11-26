import {makeExecutableSchema} from '@graphql-tools/schema';

import typeDefs from './schema';
import resolvers from './resolvers';
import {makeApolloServer} from '../util/makeServer';

export const authorSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

makeApolloServer(authorSchema, 5002);
