import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {GraphQLSchema} from 'graphql';

export const makeApolloServer = (schema: GraphQLSchema, port: number) => {
  const server = new ApolloServer({
    schema,
  });

  const app = express();
  server.applyMiddleware({app});

  const PORT = port || 5000;

  app.listen({port: PORT}, () =>
    console.log(
      `🚀 Server ready at port http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};
