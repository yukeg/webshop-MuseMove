// Check if the user is already logged in on page load
window.addEventListener('load', function () {
    isLoggedIn = checkLoginStatus();
    toggleLoginState();
    cartLoginState();
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
    cartLoginState();
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

function cartLoginState() {
    if (isLoggedIn) {
        const userFName = localStorage.getItem('fname');
        if (userFName) {
            document.getElementById("cartHeader").innerText = `Hey ${userFName}! Welcome to your cart`;
        }
    } else {
        document.getElementById("cartHeader").innerText = "Welcome to your cart";
    }
}

function logout() {
    isLoggedIn = false;
    localStorage.removeItem('fname');
    toggleLoginState();
    cartLoginState();
}

function storePageUrl() {
    return document.referrer
}

function setAction() {
    var dynamicUrl = storePageUrl();
    
    // Set the action attribute of the form to the dynamic URL
    document.getElementById("login-form").action = dynamicUrl;
    
    // Continue with form submission
    return true;
}   
