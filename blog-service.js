const fs = require("fs"); // required at the top of your module

var posts = [];
var categories = [];

function readDataFromFile(fileName) {
  //dynamically passing the filename as a string
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) reject("unable to read file");
      //data = JSON.parse(data);
      resolve(JSON.parse(data)); //this is resolving the parsed json data
    });
  });
}
exports.initialize = () => {
  return new Promise(async (resolve, reject) => {
    try {
      posts = await readDataFromFile(__dirname + "/data/posts.json");
      categories = await readDataFromFile(__dirname + "/data/categories.json");
      resolve(); // empty resolve telling us the promise resolve successfully completed
    } catch (error) {
      reject(error);
    }
  });
};

exports.getAllPosts = () => {
  return new Promise((resolve, reject) => {
    if (posts.length) {
      resolve(posts);
    } else {
      reject("no results returned");
    }
  });
};

exports.getPublishedPosts = () => {
  return new Promise((resolve, reject) => {
    if (posts.length) {
      let result = [];
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].published) {
          result.push(posts[i]);
        }
      }
      if (result.length) {
        resolve(result);
      } else {
        reject("no results returned");
      }
    } else {
      reject("no results returned");
    }
  });
};

exports.getCategories = () => {
  return new Promise((resolve, reject) => {
    if (categories.length) {
      resolve(categories);
    } else {
      reject("no results returned");
    }
  });
};
