const fetch = require("node-fetch");

// async means a function that always return a promise
// await keyword can be only used on a function that returns a promise
async function loadUsers() {
  try {
    let res = await fetch(url);
    let json = await res.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log("Error while loading authors");
  }
}

loadUsers();
console.log("Hello world");
