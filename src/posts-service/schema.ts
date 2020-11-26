const typeDefs = `

type Post {
  id: Int!
  authorId: Int!
  title: String
  votes: Int
}

# the schema allows the following query:
type Query {
  posts: [Post]
  postsByAuthorId(authorId: Int!): [Post]
}

# this schema allows the following mutation: 
type Mutation {
  upvotePost (
    postId: Int!
  ): Post
}
`;

export default typeDefs;
