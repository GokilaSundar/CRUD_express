// const mongodb = require("mongodb");
// const mongoClient = mongodb.MongoClient; //usedto connect with db

// const objectId = mongodb.ObjectId; //to get exact id from mongo we used object Id from mongodb

// const uri = "mongodb://localhost:27017";
// const client = new mongoClient(uri);
// var database;

// const getDatabase = async () => {
//   try {
//     if (!database) {
//       await client.connect();
//       database = client.db("library");
//     }
//     return database;
//   } catch (err) {
//     console.log("Problem to create an Database");
//   } finally {
//     console.log("Database successfully created");
//   }
// };

// module.exports = {
//   getDatabase,
//   objectId,
// };

//

//

///------///----///

const mongoose = require("mongoose");
const getDatabase = async () => {
  mongoose
    .connect("mongodb://localhost:27017/library")
    .then(() => console.log("Database connected successfully using mongoose"))
    .catch(() =>
      console.log("Error while connected with database using mongoose")
    );
};

module.exports = {
  getDatabase,
};
