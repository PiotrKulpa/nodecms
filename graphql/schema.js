const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: Int
    name: String
  }
  type Query {
    hello: String
    hello2: String
    findUser(id: Int): User
  }
  type Mutation {
    setMessage(message: String): String
  }
`);

module.exports = schema;