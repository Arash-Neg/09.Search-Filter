/* in this project we use JSON SERVER package to create a global package and use it as a local database and acts as an API, so we can send request recieve response and other fetching commands */

//Endpoint: http://localhost:3000/items

//API instance config
const app = axios.create({
  baseURL: "http://localhost:3000",
});

//Global Variables
let allProductsData = [];
const filters = {
  searchItems: "",
};

//DOM Variables
const searchInput = document.querySelector("#search");

document.addEventListener("DOMContentLoaded", () => {
  //load the data from json server(endpoint) when page loaded
  app
    .get("/items")
    .then((res) => {
      //get/put the data from API to a local variable
      allProductsData = res.data;
      //render products on DOM
      renderProducts(allProductsData, filters);
    })
    .catch((err) => console.log(err.message));
});

function renderProducts(_products, _filter) {
  const filterProducts = _products.filter((p) =>
    p.title.toLowerCase().includes(filters.searchItems.toLowerCase())
  );
  console.log(filterProducts);
  return filterProducts;
}

searchInput.addEventListener("input", (e) => {
  filters.searchItems = e.target.value;
  renderProducts(allProductsData, filters);
});
