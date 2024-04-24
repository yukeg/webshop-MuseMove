document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.add-to-cart').addEventListener('click', function() { 
        const productId = this.getAttribute('product-id'); 
        const productName = document.querySelector('.product-details h1').innerText;
        const productPriceText = document.querySelector('.current-price').innerText.replace(/[^\d,.-]/g, '').replace(',', '.');
        const productPrice = parseFloat(productPriceText);
        const quantitySelected = parseInt(document.getElementById('quantity-select').value);
        const productImage = document.querySelector('.carousel-inner .active img').src;

        // Check if the price is a valid number before proceeding.
        if (isNaN(productPrice)) {
            alert('Invalid price format. Please check the product details.');
            return; // Stop further execution if price is not valid.
        }

        // Check if there are size options
        const sizeOptions = document.querySelectorAll('input[name="size"]');
        let productSize = null;
        if (sizeOptions.length > 0) {
            const checkedSizeOption = document.querySelector('input[name="size"]:checked');
            if (!checkedSizeOption) {
                alert('Please select a size.');
                return; // Stop further execution if size is not selected.
            }
            productSize = checkedSizeOption.value;
        }

        // Proceed to add to cart
        const newProduct = {
            id: productId,
            size: productSize,
            name: productName,
            price: productPrice, // Use the parsed price here.
            quantity: quantitySelected,
            image: productImage
        };

        // Include size in product if applicable
        if (productSize !== null) {
            newProduct.size = productSize;
        }

        let cart = JSON.parse(localStorage.getItem('cart') || '{}');
        const productKey = productSize ? `${productId}_${productSize}` : productId;
        console.log('Product Key (Details Page):', productKey);
        if (cart[productKey]) {
            cart[productKey].quantity += newProduct.quantity;
        } else {
            newProduct.id = Date.now().toString();
            cart[productKey] = newProduct;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Add to cart successful!');
    });
});




