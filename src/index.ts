import {makeExecutableSchema} from '@graphql-tools/schema';
import {ApolloServer} from 'apollo-server';

import typeDefs from './schema';
import resolvers from './resolvers';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
});

server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
