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
});

export default model('Comment', commentsSchema);
