// // db.js
// import { MongoClient } from 'mongodb';

// // Connection URI for the MongoDB database
// const uri = 'mongodb://localhost:27017/mydb';

// // Create a new MongoClient
// const client = new MongoClient(uri);

// // Export a function to connect to the database
// export async function connectToDatabase() {
//   await client.connect();

//   // Select the database and collection
//   const database = client.db('mydb');
//   const collection = database.collection('cabinet');

//   return collection;
// }
