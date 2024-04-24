// Check if the user is already logged in on page load
window.addEventListener('load', function () {
    isLoggedIn = checkLoginStatus();
    toggleLoginState();
    });
    
    function checkLoginStatus() {
    return localStorage.getItem('fname') !== null;
    }
    
    let isLoggedIn = false;
    
    function store() {
        isLoggedIn = true;
        let inputFname = document.getElementById("fname");
        localStorage.setItem("fname", inputFname.value);
        toggleLoginState();
    }
    
    function toggleLoginState() {
        if (isLoggedIn) {
            // User is logged in
            const userFName = localStorage.getItem('fname');
            if (userFName) {
                document.getElementById('userDropdownToggle').innerText = userFName;
            }
            document.getElementById('loginLink').style.display = 'none';
            document.getElementById('logoutLink').style.display = 'block';
        } else {
            // User is logged out
            document.getElementById('userDropdownToggle').innerHTML = '<i class="fa fa-user" style="font-size: 24px;"></i>';
            document.getElementById('loginLink').style.display = 'block';
            document.getElementById('logoutLink').style.display = 'none';
        }
    }
    
    function logout() {
        isLoggedIn = false;
        localStorage.removeItem('fname'); 
        toggleLoginState();
    }



window.onload = function() {
    let maxCardHeight = 0;
    // gain the height of all cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      if (card.offsetHeight > maxCardHeight) {
        maxCardHeight = card.offsetHeight;
      }
    });
  
    // Set the minimum height of all cards to the height of the tallest card
    cards.forEach(card => {
      card.style.minHeight = maxCardHeight + 'px';
    });
  };

  document.addEventListener('DOMContentLoaded', (event) => {
    // Get the trigger buttons of all drop-down menus
    const dropdownButtons = document.querySelectorAll('.dropdown-toggle');

    // Traverse buttons and add event listeners
    dropdownButtons.forEach(button => {
        // Show drop-down menu when mouse is hovering
        button.addEventListener('mouseenter', (event) => {
            let dropdownMenu = button.nextElementSibling;
            dropdownMenu.classList.add('show');
        });

        // Hide drop-down menu when mouse moves away
        button.addEventListener('mouseleave', (event) => {
            let dropdownMenu = button.nextElementSibling;
            // Check if the mouse is moved over the drop-down menu
            dropdownMenu.addEventListener('mouseleave', (event) => {
                dropdownMenu.classList.remove('show');
            });
        });

        // Change background color when mouse hovers over menu item
        button.nextElementSibling.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('mouseenter', (event) => {
                event.target.style.backgroundColor = '#5B7493'; // light green
            });
            item.addEventListener('mouseleave', (event) => {
                event.target.style.backgroundColor = ''; // Remove background color
            });
        });
    });


    
    
    
});

//classifier
let selectedCategory = 'all'; // choose all categories by default
let selectedPriceRange = 'all'; // choose all prices by default

///
function filterProducts() {
    const cards = document.querySelectorAll('.col-lg-3.col-md-4.col-sm-6.col-12.mb-4');
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || 'all'; 
        const priceText = card.querySelector('.product-price').textContent;
        // convert price format
        const price = parseFloat(priceText.replace('kr', '').replace(',', '.').replace(/\s/g, ''));

        const priceMatches = selectedPriceRange === 'all' ? true : checkPriceMatch(price, selectedPriceRange);
        const categoryMatches = selectedCategory === 'all' || cardCategory === selectedCategory;
        
        card.style.display = (priceMatches && categoryMatches) ? '' : 'none';
    });
}

///
function checkPriceMatch(price, priceRange) {
    if (priceRange === 'all') return true; // select all 
    if (priceRange === '199-') { // price > 199
        return price > 199;
    }
    // other price zone
    const [minPrice, maxPrice] = priceRange.split('-').map(val => val ? parseFloat(val) : val);
    const max = maxPrice !== undefined ? maxPrice : Infinity;
    return price >= minPrice && price <= max;
}

document.querySelectorAll('.dropdown-item[data-category], .dropdown-item[data-price]').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault(); 
        const category = this.getAttribute('data-category');
        const price = this.getAttribute('data-price');
        
        if (category !== null) {
            selectedCategory = category;
        } else if (price !== null) {
            selectedPriceRange = price;
        }
        
        filterProducts(); 
    });
});


function showNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Hide notification after 2 seconds
    setTimeout(() => {
      notification.remove();
    }, 2000);
    }

    document.addEventListener('DOMContentLoaded', function() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                
                // gain product id, price, size and name
                const productId = this.getAttribute('product-id');
                const price = parseFloat(this.closest('.card-body').querySelector('.product-price').textContent.replace(' kr', '').replace(',', '.'));
                const sizeInputs = this.closest('.card-body').querySelectorAll('input[name="size"]');
                const sizeInput = this.closest('.card-body').querySelector('input[name="size"]:checked');
                const size = sizeInput ? sizeInput.value : null;
    
                const productName = this.closest('.card').querySelector('.product-name').textContent;
                const productImage = this.closest('.card').querySelector('.product-img').src;
                
                // check if size is necessary and have been chosen, if not, show the notification
                if (sizeInputs.length > 0 && size === null) {
                    showNotification("Please select a size.");
                    return;
                }
                
                // gain cart inforamtion from localStorage
                let cart = JSON.parse(localStorage.getItem('cart') || '{}');
                
                // create unique product key (id & size)
                const productKey = size ? `${productId}_${size}` : productId;
                console.log('Product Key (List Page):', productKey);
                // renew cart and store information into localStorage
                if(cart[productKey]) {
                    cart[productKey].quantity += 1;
                } else {
                    cart[productKey] = {quantity: 1, price: price, size: size, name: productName, image: productImage};
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                showNotification("Add to cart successful!");
            });
        });
    });
    
    // show Notification 
    function showNotification(message) {
        alert(message); 
    }
    