function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function addToCart(productName) {
    alert(productName + " has been added to your cart!");
}
