const typeDefs = `
type Author {
  id: Int!
  firstName: String
  lastName: String
}

# the schema allows the following query:
type Query {
  author(id: Int!): Author
  authorsByIds(ids: [Int]!): [Author]
}
`;

export default typeDefs;
