import { getLocalStorage } from "./utils.mjs";
console.log(window.location.hostname);

// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
// }

// function cartItemTemplate(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
// </li>`;

//   return newItem;
// }

// renderCartContents();
function fixPath(path) {
  console.log(window.location.hostname);
  if (!path) return "";

  // Check if we're in production (Netlify)
  const isProduction =
  
    window.location.hostname !== "localhost" && window.location.hostname !== "127.0.01";

  // For production, convert to absolute path
  if (isProduction) {
    return "/" + path.replace(/^\.+\//, "");
  }

  // For local development, keep relative path
  return path;
}

function cartItemTemplate(item) {
  if (!item) return "";

  try {
    const imagePath = fixPath(item.Image);
    return `<li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${imagePath}"
          alt="${item.Name || "Product"}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name || "Unknown Product"}</h2>
      </a>
      <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "N/A"}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice ? item.FinalPrice.toFixed(2) : "0.00"}</p>
    </li>`;
  } catch (e) {
    console.error("Error creating cart item template:", e);
    return "";
  }
}

export function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartContents();
});
