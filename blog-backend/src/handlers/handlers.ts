import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  graphql,
} from 'graphql';
import { BlogType, CommentType, UserType } from '../schema/schema';
import User from '../models/User';
import Blog from '../models/Blog';
import Comment from '../models/Comment';
import { Document } from 'mongoose';
import { hashSync, compareSync } from 'bcryptjs';

type DocuemntType = Document<any, any, any>;

const RootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  fields: {
    //get all users
    users: {
      type: GraphQLList(UserType),
      async resolve() {
        return await User.find();
      },
    },
    //get all blogs
    blogs: {
      type: GraphQLList(BlogType),
      async resolve() {
        return await Blog.find();
      },
    },

    //get all comments
    comments: {
      type: GraphQLList(CommentType),
      async resolve() {
        return await Comment.find();
      },
    },
  },
});

const mutations = new GraphQLObjectType({
  name: 'mutations',
  fields: {
    //userSignup
    signup: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { name, email, password }) {
        let existingUser: DocuemntType;
        try {
          existingUser = await User.findOne({ email });
          if (existingUser) return new Error('User already exists');
          const encryptedPassword = hashSync(password);
          const user = new User({ name, email, password: encryptedPassword });
          return await user.save();
        } catch (err) {
          throw new Error('User signup failed!, Try Again');
        }
      },
    },
    //usersLogin
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { email, password }) {
        let existingUser: DocuemntType;
        try {
          existingUser = await User.findOne({ email });
          if (existingUser) {
            //@ts-ignore
            if (compareSync(password, existingUser?.password)) {
              return existingUser;
            } else {
              return new Error('Incorrect password!');
            }
          } else {
            return new Error('user not registered!');
          }
        } catch (err) {
          return new Error(err);
        }
      },
    },

    addBlog: {
      type: BlogType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { title, content, date }) {
        let blog: DocuemntType;
        try {
          blog = new Blog({ title, content, date });
          return await blog.save();
        } catch (err) {
          throw new Error(err);
        }
      },
    },

    updateBlog: {
      type: BlogType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { id, title, content }) {
        let existingBlog: DocuemntType;
        try {
          existingBlog = await Blog.findById(id);
          if (!existingBlog) {
            return new Error('blog does not exist');
          } else {
            return await Blog.findByIdAndUpdate(
              id,
              { title, content },
              { new: true }
            );
          }
        } catch (err) {
          return new Error(err);
        }
      },
    },

    deleteBlog: {
      type: BlogType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },

      async resolve(parent, { id }) {
        let existingBlog: DocumentType;
        try {
          existingBlog = await Blog.findById(id);
          if (!existingBlog) {
            return new Error('blog doest not exist!');
          } else {
            return await Blog.findByIdAndDelete(id);
          }
        } catch (err) {
          return new Error(err);
        }
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery, mutation: mutations });
