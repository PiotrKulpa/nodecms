const { buildSchema } = require('graphql');

const schema = buildSchema(`
  scalar MyDate
  type User {
    id: Int
    name: String
  }
  type Post {
    title: String
    content: String
    img: String
    created_at: MyDate
  }
  type Query {
    hello: String
    getPosts: [Post]
    getPostById(id: String): Post
  }
  type Mutation {
    addPost(title: String, content: String, img: String): Post
    deletePostById(id: String): Int
    updatePostById(id: String, title: String, content: String, img: String): Int
  }
`);

module.exports = schema;