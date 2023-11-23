import { connect } from 'mongoose';

export const connectToDatabase = async () => {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (err) {
    throw new Error(`not connected to db!, ${err} `);
  }
};
