let cart = {};
let discountValue = 0; // Default discount value

// Predefined valid discount codes and their respective discounts
const discountCodes = {
  SAVE10: 10, // $10 discount
  SAVE20: 20, // $20 discount
  SAVE30: 30, // $30 discount
};

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

function removeItem(productId) {
  delete cart[productId];
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

  const total = subtotal - discountValue;

  document.getElementById('subtotal').innerText = `$${subtotal.toFixed(2)}`;
  document.getElementById('discount').innerText = `-$${discountValue.toFixed(2)}`;
  document.getElementById('total').innerText = `$${total.toFixed(2)}`;
}

// Apply a discount code
function applyDiscount() {
  const code = document.getElementById('discount-code').value.trim().toUpperCase();
  const message = document.getElementById('discount-message');

  if (discountCodes[code]) {
    discountValue = discountCodes[code];
    message.innerText = `Discount code applied: $${discountValue} off!`;
    message.style.color = 'green';
  } else {
    discountValue = 0; // Reset discount if invalid code
    message.innerText = 'Invalid discount code.';
    message.style.color = 'red';
  }

  updateCart();
}

// PayPal Integration
paypal.Buttons({
  createOrder: function (data, actions) {
    const total = parseFloat(document.getElementById('total').innerText.replace('$', ''));
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total.toFixed(2),
          },
        },
      ],
    });
  },
  onApprove: function (data, actions) {
    return actions.order.capture().then(function (details) {
      alert('Payment successful! Thank you, ' + details.payer.name.given_name);
      cart = {}; // Clear the cart
      discountValue = 0; // Reset discount
      updateCart();
    });
  },
}).render('#paypal-button-container');
