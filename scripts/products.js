import "../components/simple.js";

function getCLP(price) {
  const convertionRate = 793;
  return Math.round(price * convertionRate);
}

async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    const items = document.querySelector("div#products");

    data.forEach((productData) => {
      const product = document.createElement("simple-component");
      product.rating = Math.floor(Math.random() * 11);
      product.discount = Math.floor(Math.random() * 101);
      product.name = productData.title;
      product.image = productData.image;
      product.price = getCLP(productData.price);
      items.appendChild(product);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getProducts();
