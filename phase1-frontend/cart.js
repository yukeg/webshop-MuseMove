document.addEventListener("DOMContentLoaded", () => {

  // Fetch the products from the cart and display them
  function displayProducts() {
    const productsSection = document.getElementById("productsSection");
    productsSection.innerHTML = "";

    let cart = JSON.parse(localStorage.getItem("cart") || "{}");
    let products = Object.keys(cart).map((productKey) => {
      const [id, size] = productKey.split("_");
      return {
        id,
        size: cart[productKey].size || '',
        name: cart[productKey].name,
        price: cart[productKey].price,
        quantity: cart[productKey].quantity,
        image: cart[productKey].image,
      };
    });

    products.forEach((product) => {
      const productKey = product.size ? `${product.id}_${product.size}` : product.id; // Adjusted productKey generation
      const productElement = document.createElement("div");
      productElement.className = "product-card";
      productElement.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" style="width: 100px; height: auto;">
        </div>
        <div class="product-details">
          <p>${product.name}</p>
          ${product.size ? `<p>Size: ${product.size}</p>` : ''}
          <p>Price: ${product.price} kr</p>
          <div class="quantity-controls">
              <button onclick="changeQuantity('${productKey}', -1)">-</button>
              <span>${product.quantity}</span>
              <button onclick="changeQuantity('${productKey}', 1)">+</button>
          </div>
        </div>
        <button class="remove-button" onclick="removeProduct('${productKey}')">Remove</button>
      `;
      productsSection.appendChild(productElement);
    });
  }



  // Function to change the quantity of a product
  window.changeQuantity = function (productKey, change) {
    let cart = JSON.parse(localStorage.getItem("cart") || "{}");

    if (cart[productKey]) {
      cart[productKey].quantity += change;

      // Remove product if quantity is 0 or less
      if (cart[productKey].quantity <= 0) {
        delete cart[productKey]; // Remove the product from the cart
      }

      localStorage.setItem("cart", JSON.stringify(cart)); // Update local storage
      displayProducts(); // Update the product display
      updateOrderSummary(); // Update the order summary
    }
  };

  window.removeProduct = function (productKey) {
    let cart = JSON.parse(localStorage.getItem("cart") || "{}");
    delete cart[productKey]; // Delete the product from the cart
    localStorage.setItem("cart", JSON.stringify(cart)); // Update local storage

    displayProducts(); // Update the product display
    updateOrderSummary(); // Update the order summary
  };


  // Function to update the order summary
  function updateOrderSummary() {
    let cart = JSON.parse(localStorage.getItem("cart") || "{}");
    let products = Object.values(cart);
    const subtotal = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    const shipping = subtotal > 350 ? 0 : 30; // Free shipping for orders over 350 DKK
    const total = subtotal + shipping;

    document.getElementById("subtotal").innerText = `${subtotal.toFixed(
      2
    )} kr`;
    document.getElementById("shipping").innerText =
      shipping === 0 ? "Free" : `${shipping.toFixed(2)} kr`;
    document.getElementById("total").innerText = `${total.toFixed(2)} kr`;
  }

  document
    .getElementById("continueShopping")
    .addEventListener("click", function () {
      window.location.href = "shop_page.html"; // Redirects the user to shop_page.html
    });

  // Initial display of products and order summary
  displayProducts();
  updateOrderSummary();
});
