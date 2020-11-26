import {IResolvers} from '@graphql-tools/utils';
import {filter, find} from 'lodash';

// example data
const posts = [
  {id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2},
  {id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3},
  {id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1},
  {id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7},
];

const resolvers: IResolvers = {
  Query: {
    posts: () => posts,
    postsByAuthorId: (_, {authorId}) => {
      console.count('postsByAuthorId');
      return filter(posts, {authorId});
    },
  },

  Mutation: {
    upvotePost: (_, {postId}) => {
      const post = find(posts, {id: postId});
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },
};

export default resolvers;
