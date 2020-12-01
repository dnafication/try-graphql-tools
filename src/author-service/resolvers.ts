import {IResolvers} from '@graphql-tools/utils';
import {find, shuffle} from 'lodash';

// example data
const authorsData = [
  {id: 1, firstName: 'Tom', lastName: 'Coleman'},
  {id: 2, firstName: 'Sashko', lastName: 'Stubailo'},
  {id: 3, firstName: 'Mikhail', lastName: 'Novikov'},
];

const resolvers: IResolvers = {
  Query: {
    author: (_, {id}) => {
      console.count('author');
      return find(authorsData, {id});
    },
    authorsByIds: (_, {ids}) => {
      console.count(`authorsByIds ${ids}`);
      const authors = ids.map((id: number) => {
        const author = find(authorsData, {id});
        if (author) {
          return author;
        } else {
          return null;
        }
      });
      return shuffle(authors);
    },
  },
};

export default resolvers;
