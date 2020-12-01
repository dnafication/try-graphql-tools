import {stitchSchemas} from '@graphql-tools/stitch';
import {UrlLoader} from '@graphql-tools/url-loader';
import {loadSchema} from '@graphql-tools/load';

import {makeApolloServer} from './util/makeServer';
import {delegateToSchema} from '@graphql-tools/delegate';
import {batchDelegateToSchema} from '@graphql-tools/batch-delegate';

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
        author: Author
      }
      extend type Author {
        posts: [Post!]
      }
    `,
    resolvers: {
      Author: {
        posts: {
          selectionSet: '{id}', // it is like the fragment this will be included whether its queried originally or not
          resolve(author, _args, context, info) {
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
          resolve(post, _args, context, info) {
            return batchDelegateToSchema({
              schema: authorSchema,
              operation: 'query',
              fieldName: 'authorsByIds',
              key: post.authorId,
              argsFromKeys: authorIds => ({ids: authorIds}),
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
