// import the express module
var express = require("express");
var blogsService = require("./blog-service"); //gets imported
let fs = require("fs"); //imported library to read from a file

// create an new variable of type express
var app = express();

// set the server to listen on a port, either the one provided by the environment or 8080

var HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public"));

// define the default route, "/", to send a response and redirect the root to about page
app.get("/", (req, res) => {
  res.redirect("/about");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/views/about.html");
});

//todo get data from posts.json file
//loop through the array of objects to find where the objects published property is set to true
//return in a json formatted string

app.get("/blog", async (req, res) => {
  try {
    let result = await blogsService.getPublishedPosts();
    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

app.get("/posts", async (req, res) => {
  try {
    let result = await blogsService.getAllPosts();
    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

app.get("/categories", async (req, res) => {
  try {
    let result = await blogsService.getCategories();
    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/views/404.html");
});

// start the server and log a message to the console

async function main() {
  try {
    await blogsService.initialize();
    app.listen(HTTP_PORT, () => {
      console.log("Express http server listening on port " + HTTP_PORT);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
