import {makeExecutableSchema} from '@graphql-tools/schema';

import typeDefs from './schema';
import resolvers from './resolvers';
import {makeApolloServer} from '../util/makeServer';

export const postsSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

makeApolloServer(postsSchema, 5001);
