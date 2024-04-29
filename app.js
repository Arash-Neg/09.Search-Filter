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
const productsDOM = document.querySelector(".products-center");
const filterBtns = document.querySelectorAll(".btn");
const filterBox = document.querySelectorAll(".filter-box");

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
  //get the searched products
  const filterProducts = _products.filter((p) =>
    p.title.toLowerCase().includes(filters.searchItems.toLowerCase())
  );
  //as soon as the user typed somethind in the search box the productsDOM should be empty otherwise it would appendchild the previous ones
  productsDOM.innerHTML = "";

  filterProducts.forEach((item, index) => {
    // 1.content
    const productsDIV = document.createElement("div");
    productsDIV.classList.add("product");
    productsDIV.innerHTML = `<div class="img-container">
    <img src="${item.image}" alt= "p-${index}" class="product-img" />
  </div>
  <div class="product-desc">
    <p class="product-price">$ ${item.price}</p>
    <p class="product-title">${item.title}</p>
  </div>`;

    // 2.append to DOM
    productsDOM.appendChild(productsDIV);
  });
}

searchInput.addEventListener("input", (e) => {
  filters.searchItems = e.target.value;
  renderProducts(allProductsData, filters);
});

//Filters the DOM
/* filterBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
   
    const filter = e.target.dataset.filter;
    filters.searchItems = filter;
    renderProducts(allProductsData, filter);
  });
  e.target.classList.add("active");
});
 */

//Manages the button active class and filters the DOM
filterBox.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filterBtns.forEach((btn) => {
      btn.classList.remove("active");
      const filter = e.target.dataset.filter;
      filters.searchItems = filter;
      renderProducts(allProductsData, filter);
    });
    e.target.classList.add("active");
  });
});
