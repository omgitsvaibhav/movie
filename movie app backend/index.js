import app from "./server.js";
import { MongoClient } from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js";
import dotenv from "dotenv";

dotenv.config();

const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.7i89eu4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

const port = 8000;


client.connect(
  uri,
  {
      maxPoolSize: 50,
      wtimeoutMS: 2500,
      useNewUrlParser: true
  }
).catch(err => {
  console.error(err.stack);
  process.exit(1);
});
 
await ReviewsDAO.injectDB(client);

  app.listen(port, () => {
      console.log(`listening on port ${port}`);
  });
