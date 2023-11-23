import express from 'express';
import { config } from 'dotenv';
import { connectToDatabase } from './utils/connection';
import { graphqlHTTP } from 'express-graphql';

// Dotenv config
config();

const app = express();

app.use('/graphql', graphqlHTTP({ schema: null, graphiql: true }));

connectToDatabase()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server Open on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
