import { gql } from 'apollo-server';

export const authTypes = gql`
extend type Query {
  profile: User!
}

extend type Mutation {
  login(input: LoginInput!): AuthPayload!
  logout: LogoutPayload!
  createUser(input: CreateUserInput!): AuthPayload!
  refreshToken(input: RefreshToknInput!): AuthPayload!
}

input RefreshToknInput {
  userId: ID!
  refreshToken: String!
}

type LogoutPayload {
  result: Boolean!
}

type AuthPayload {
  token: String!
  refreshToken: String!
  user: User!
}

input LoginInput {
  email: String!
  password: String!
}

input CreateUserInput {
  email: String!
  password: String!
  name: String
}
`;
