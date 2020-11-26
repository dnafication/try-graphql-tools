import {makeExecutableSchema} from '@graphql-tools/schema';

import typeDefs from './schema';
import resolvers from './resolvers';
import {makeApolloServer} from '../util/makeServer';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

makeApolloServer(schema, 5001);
