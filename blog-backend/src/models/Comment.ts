import { Schema, model } from 'mongoose';

const commentsSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  //https://mongoosejs.com/docs/populate.html
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  blog: { type: Schema.Types.ObjectId, ref: 'Blog' },
});

export default model('Comment', commentsSchema);
