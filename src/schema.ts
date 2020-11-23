import {ITypeDefinitions} from '@graphql-tools/utils';

const typeDefs: ITypeDefinitions = `
type Author {
  id: Int!
  firstName: String
  lastName: String
}

# the schema allows the following query:
type Query {
  author(id: Int!): Author
}

`;

export default typeDefs;
