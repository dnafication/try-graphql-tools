import {makeExecutableSchema} from '@graphql-tools/schema';

import {addMocksToSchema} from '@graphql-tools/mock';
import {mergeSchemas} from '@graphql-tools/merge';
import {makeApolloServer} from './util/makeServer';

let postsSchema = makeExecutableSchema({
  typeDefs: `
    type Post {
      id: ID!
      message: String!
      author: User!
    }

    type User {
      id: ID!
      posts: [Post]!
    }

    type Query {
      postById(id: ID!): Post
      postUserById(id: ID!): User
    }
  `,
});

let usersSchema = makeExecutableSchema({
  typeDefs: `
    type User {
      id: ID!
      email: String!
    }

    type Query {
      userById(id: ID!): User
    }
  `,
});

// just mock the schemas for now to make them return dummy data
postsSchema = addMocksToSchema({schema: postsSchema});
usersSchema = addMocksToSchema({schema: usersSchema});

const mergedSchema = mergeSchemas({schemas: [postsSchema, usersSchema]});

makeApolloServer(mergedSchema, 5001);
