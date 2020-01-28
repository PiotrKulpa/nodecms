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
  type Msgs {
    _id: Int
    title: String
    content: String
  }
  type Query {
    hello: String
    hello2: String
    findUser(id: Int): User
    getPosts: [Post]
    getPostById(id: String): Post
    getMsgs: [Msgs]
  }
  type Mutation {
    setMessage(message: String): String
    addPost(title: String, content: String, img: String): Post
    deletePostById(id: String): Post
  }
`);

module.exports = schema;