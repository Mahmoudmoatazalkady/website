
// Initialize cart
let cart = [];

// Function to update the cart section
function updateCart() {
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = ''; // Clear previous cart items

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        // Create cart item element
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-details">
                <h3>${item.name}</h3>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button class="remove-item" data-index="${index}">
                <i class="fas fa-trash"></i> Remove
            </button>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Add total and checkout button
    const cartTotal = document.createElement('div');
    cartTotal.classList.add('cart-total');
    cartTotal.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
    cartContainer.appendChild(cartTotal);

    const checkoutButton = document.createElement('button');
    checkoutButton.classList.add('checkout-button');
    checkoutButton.innerHTML = `<i class="fas fa-credit-card"></i> Checkout`;
    cartContainer.appendChild(checkoutButton);
}

// Function to add an item to the cart
function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1, image });
    }

    updateCart();
}

// Event listeners for "Add to Cart" buttons in menu section
document.querySelectorAll('.menu-item button').forEach(button => {
    button.addEventListener('click', () => {
        const menuItem = button.closest('.menu-item');
        const name = menuItem.querySelector('h3').innerText;
        const price = parseFloat(menuItem.querySelector('p').innerText.replace('$', ''));
        const image = menuItem.querySelector('img').src;

        addToCart(name, price, image);
    });
});

// Event listeners for "Add to Cart" buttons in deals section
document.querySelectorAll('.deal button').forEach(button => {
    button.addEventListener('click', () => {
        const dealItem = button.closest('.deal');
        const name = dealItem.querySelector('h3').innerText;
        const priceText = dealItem.querySelector('p').innerText;
        const price = parseFloat(priceText.match(/\$([0-9]+\.[0-9]{2})/)[1]);
        const image = 'default-deal-image.jpg'; // Placeholder image for deals

        addToCart(name, price, image);
    });
});

// Event delegation for removing items
document.querySelector('.cart-section').addEventListener('click', event => {
    if (event.target.classList.contains('remove-item')) {
        const index = event.target.getAttribute('data-index');
        cart.splice(index, 1); // Remove item from cart
        updateCart();
    }
});

// Dark Mode Toggle Functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Load dark mode preference from localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark-mode');
  darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode'; // Change button text/icon
}

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode'; // Change button text/icon
  } else {
    localStorage.setItem('darkMode', 'disabled');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode'; // Change button text/icon
  }
});
