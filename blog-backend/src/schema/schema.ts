import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'userType',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const blogType = new GraphQLObjectType({
  name: 'blogType',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const CommentType = new GraphQLObjectType({
  name: 'CommentType',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    text: { type: GraphQLNonNull(GraphQLString) },
  }),
});
