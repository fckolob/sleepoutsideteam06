
import { setLocalStorage, qs } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";

const dataSource = new ProductData("tents");

const productId = getParam("product");
console.log(dataSource.findProductById(productId));




function addProductToCart(product) {
  try {
    if (product) {
      setLocalStorage("so-cart", product);
      alert("Item added to cart successfully!");
    }
  } catch (e) {
    console.error("Error adding product to cart:", e);
    alert("Error adding item to cart. Please try again.");
  }
}

// add to cart button event handler
async function addToCartHandler(e) {
  try {
    const product = await dataSource.findProductById(e.target.dataset.id);
    if (product) {
      addProductToCart(product);
    }
  } catch (e) {
    console.error("Error in add to cart handler:", e);
    alert("Error adding item to cart. Please try again.");
  }
}

// add listener to Add to Cart button
qs("#addToCart").addEventListener("click", addToCartHandler);

