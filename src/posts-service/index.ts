import {makeExecutableSchema} from '@graphql-tools/schema';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';

import typeDefs from './schema';
import resolvers from './resolvers';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
});

const app = express();
server.applyMiddleware({app});

const PORT = 5001;

app.listen({port: PORT}, () =>
  console.log(
    `🚀  Server ready at port http://localhost:${PORT}${server.graphqlPath}`
  )
);
