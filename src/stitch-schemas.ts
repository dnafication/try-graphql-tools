import {makeExecutableSchema} from '@graphql-tools/schema';
import {
  delegateToSchema,
  loadSchema,
  stitchSchemas,
  UrlLoader,
} from 'graphql-tools';

import {makeApolloServer} from './util/makeServer';

/**
 * You can chose to introspect just once and store the information in memory.
 * It may not be possible in case of lambda
 */

// schema loading: url loader
async function loadRemotePostsSchema() {
  const postsSchema = await loadSchema('http://localhost:5001/graphql', {
    loaders: [new UrlLoader()],
  });
  return postsSchema;
}

async function loadRemoteAuthorSchema() {
  const postsSchema = await loadSchema('http://localhost:5002/graphql', {
    loaders: [new UrlLoader()],
  });
  return postsSchema;
}

async function stitchOurSchemas() {
  const postsSchema = await loadRemotePostsSchema();
  const authorSchema = await loadRemoteAuthorSchema();

  const finalSchema = stitchSchemas({
    subschemas: [{schema: postsSchema}, {schema: authorSchema}],
    typeDefs: `
      extend type Post {
        author: Author!
      }
      extend type Author {
        posts: [Post!]
      }
    `,
    resolvers: {
      Author: {
        posts: {
          selectionSet: '{id}', // it is like the fragment this will be included whether its queried originally or not
          resolve(author, args, context, info) {
            return delegateToSchema({
              schema: postsSchema,
              operation: 'query',
              fieldName: 'postsByAuthorId',
              args: {authorId: author.id},
              context,
              info,
            });
          },
        },
      },
      Post: {
        author: {
          selectionSet: '{authorId}',
          resolve(post, args, context, info) {
            return delegateToSchema({
              schema: authorSchema,
              operation: 'query',
              fieldName: 'author',
              args: {id: post.authorId},
              context,
              info,
            });
          },
        },
      },
    },
  });

  return finalSchema;
}

/**
 * You can chose to introspect just once and store the information in memory.
 * It may not be possible in case of lambda
 */

stitchOurSchemas()
  .then(schema => makeApolloServer(schema, 5000))
  .catch(console.error);
