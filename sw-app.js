// add items to the cart from any page
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productInfo = this.closest('.product-info');
        const productName = productInfo.querySelector('h1').textContent;
        const productPrice = productInfo.querySelector('.price').textContent;
        const productSize = productInfo.querySelector('select').value;
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({
            name: productName,
            price: productPrice,
            size: productSize
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        
        alert(`${productName} added to cart!`);
        updateCartCount();
    });
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartIcon = document.getElementById('user-i');
    
    // Display cart count on the cart icon
    cartIcon.setAttribute('data-count', cart.length);
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', updateCartCount);

// Display Cart Items on Any Page
document.getElementById('user-i').addEventListener('click', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContent = '';

    cart.forEach(item => {
        cartContent += `<p>${item.name} - ${item.size} - ${item.price}</p>`;
    });

    // If no items in the cart, show a message
    if (cart.length === 0) {
        cartContent = '<p>Your cart is Empty :|</p>';
    }

    // Display cart content 
    const cartDisplay = document.createElement('div');
    cartDisplay.innerHTML = `
        <div id="cart-modal" style="position: fixed; top: 50px; right: 50px; background: white; padding: 20px; box-shadow: 0px 0px 10px rgba(0,0,0,0.5); z-index: 15;">
            <h2>CART ITEMS <i class="fa-solid fa-cart-shopping"></i></h2>
            ${cartContent}
            <button id="close-cart" style="height: 40px; width:70px ; background-color: #000; color: #fff;">Close</button>
        </div>
    `;
    document.body.appendChild(cartDisplay);

    // Close button
    document.getElementById('close-cart').addEventListener('click', function() {
        document.getElementById('cart-modal').remove();
    });
});

// Render Cart Items
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return; // Exit if the container does not exist
    
    cartItemsContainer.innerHTML = ''; // Clear the container
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <p>${item.name} - $${item.price}</p>
            <button onclick="removeItemFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });
}

// Remove items from the cart
function removeItemFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove the selected item
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
    alert('Item removed from cart!');

}

// Run the function to render the cart when the page loads
document.addEventListener('DOMContentLoaded', renderCart);
