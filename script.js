let cart = {};

function updateQuantity(productId, action) {
  if (!cart[productId]) {
    const prices = {
      product1: 182.4,
      product2: 19.0,
      product3: 90.0,
      product4: 720.0,
      product5: 275.0,
      product6: 345.0,
    };
    cart[productId] = { quantity: 0, price: prices[productId] };
  }

  if (action === 'add') cart[productId].quantity++;
  if (action === 'subtract' && cart[productId].quantity > 0) cart[productId].quantity--;

  updateCart();
}

function updateCart() {
  let subtotal = 0;
  for (const productId in cart) {
    const product = cart[productId];
    subtotal += product.quantity * product.price;

    document.getElementById(`${productId}-quantity`).innerText = product.quantity;
    document.getElementById(`${productId}-total`).innerText = `$${(product.quantity * product.price).toFixed(2)}`;
  }
}
