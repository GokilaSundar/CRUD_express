const express = require("express");
const app = express();
const body_parser = require("body-parser");
const exhandlebar = require("express-handlebars"); //using handlebars template engine to render view template we used in this file
const dbo = require("./db");
const objectId = dbo.objectId; //it help to id into ObjectId() class  in  mongodb id

///---///----/// for mongoose
const bookModel = require("./models/bookModel");
dbo.getDatabase();
///----///----///

app.engine(
  "hbs",
  exhandlebar.engine({
    layoutsDir: "views/",
    defaultLayout: "main",
    extname: "hbs",

    //instead of lean() we can use this
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "views"); //views folder value is view
app.use(body_parser.urlencoded({ extended: true })); //[act as a middleware] to access user input values in backend

app.get("/", async (req, res) => {
  // const database = await dbo.getDatabase();
  // const books = database.collection("books");
  // const favbooks = books.find();
  // const lists = await favbooks.toArray();

  //or

  ///---///----/// for mongoose

  // const lists = await bookModel.find({}).lean();
  //or
  const lists = await bookModel.find({}); //use runtimeoption in handlebar for access the protype instead of lean()

  ///---///----/// for mongoose

  var message = "";

  //-----//

  //get for edit item:
  var edit_id, edit_book;
  if (req.query.edit_id) {
    edit_id = req.query.edit_id;
    // edit_book = await books.findOne({ _id: new objectId(edit_id) });

    //in this line we got _id:6402802842
    //but in mongodb _id:ObjectId(67514b4932be8705e9893bf9)
    //so to get exact id from mongo we used object Id from mongodb
    //to invoke objectid class we have to use new keyword

    //or

    ///---///----/// for mongoose
    edit_book = await bookModel.findOne({ _id: edit_id });
    ///---///----/// for mongoose
  }

  //---//

  //get for delete item:

  var delete_id;
  if (req.query.delete_id) {
    delete_id = req.query.delete_id;
    // await books.deleteOne({ _id: new objectId(delete_id) });

    //or

    ///---///----/// for mongoose
    await bookModel.deleteOne({ _id: delete_id });
    ///---///----/// for mongoose

    return res.redirect("/?status=delete");
  }

  switch (req.query.status) {
    case "add":
      message = "Inserted Successfully";
      break;
    case "update":
      message = "Updated Successfully";
      break;
    case "delete":
      message = "Deleted Successfully";
      break;
    default:
      break;
  }

  // if (req.query.status) {
  //   if ("add") {
  //     message = "Inserted Successfully";
  //     console.log("Inserted Successfully");
  //   } else if ("update") {
  //     message = "Updated Successfully";
  //   } else if ("delete") {
  //     message = "Deleted Successfully";
  //   } else {
  //     console.log("Doesn't inserted properly");
  //   }
  // } else {
  //   console.log("Status doesn't dericted");
  // }
  res.render("main", { message, lists, edit_book, edit_id, delete_id });
});

app.post("/create_book", async (req, res) => {
  // const database = await dbo.getDatabase();
  // const booksCollection = database.collection("books");
  // const book = { name: req.body.name, author: req.body.author };
  // await booksCollection.insertOne(book);

  //or

  ///---///----/// for mongoose
  const book = new bookModel({
    name: req.body.name,
    author: req.body.author,
  });
  await book.save();
  ///---///----/// for mongoose

  return res.redirect("/?status=add"); //it redirect to get method
});

app.post("/update_book/:edit_id", async (req, res) => {
  let edit_id = req.params.edit_id;
  // const database = await dbo.getDatabase();
  // const booksCollection = database.collection("books");
  // const book = { name: req.body.name, author: req.body.author };
  // await booksCollection.updateOne(
  //   { _id: new objectId(edit_id) },
  //   { $set: book }
  // );

  //or

  ///---///----/// for mongoose
  await bookModel.findOneAndUpdate(
    { _id: edit_id },
    { name: req.body.name, author: req.body.author }
  );
  ///---///----/// for mongoose

  return res.redirect("/?status=update"); //it redirect to get method
});

app.listen(8000, () => console.log("Listening in 8000 port"));
