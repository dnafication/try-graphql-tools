import {IResolvers} from '@graphql-tools/utils';
import {find} from 'lodash';

// example data
const authors = [
  {id: 1, firstName: 'Tom', lastName: 'Coleman'},
  {id: 2, firstName: 'Sashko', lastName: 'Stubailo'},
  {id: 3, firstName: 'Mikhail', lastName: 'Novikov'},
];

const resolvers: IResolvers = {
  Query: {
    author: (_, {id}) => {
      console.count('author');
      return find(authors, {id});
    },
  },
};

export default resolvers;
