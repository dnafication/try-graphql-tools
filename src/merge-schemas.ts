import authorTypes from './author-service/schema';
import postTypes from './posts-service/schema';
import {mergeTypeDefs} from 'graphql-tools';
import {print} from 'graphql';

const extendedType = `
    type Author {
      posts: [Post]
    }

    type Post {
      author: Author
    }
`;

const types = [authorTypes, postTypes, extendedType];

const mergedTypes = mergeTypeDefs(types);

console.log(mergedTypes);
console.log(print(mergedTypes));
