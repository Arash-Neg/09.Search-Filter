/* in this project we use JSON SERVER package to create a global package and use it as a local database and acts as an API, so we can send request recieve response and other fetching commands */

//Endpoint: http://localhost:3000/items

//API instance config
const app = axios.create({
  baseURL: "http://localhost:3000",
});

document.addEventListener("DOMContentLoaded", () => {
  //load the data from json server(endpoint) when page loaded
  app
    .get("/items")
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.message));
});
