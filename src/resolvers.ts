import {IResolvers} from '@graphql-tools/utils';
import {find, filter} from 'lodash';

// example data
const authors = [
  {id: 1, firstName: 'Tom', lastName: 'Coleman'},
  {id: 2, firstName: 'Sashko', lastName: 'Stubailo'},
  {id: 3, firstName: 'Mikhail', lastName: 'Novikov'},
];

const resolvers: IResolvers = {
  Query: {
    author: (_, {id}) => find(authors, {id}),
  },

  // Author: {
  //   posts: author => filter(posts, {authorId: author.id}),
  // },

  // Post: {
  //   author: post => find(authors, {id: post.authorId}),
  // },
};

export default resolvers;
