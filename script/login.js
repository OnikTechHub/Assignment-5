console.log("Login page loaded");

document.getElementById('login-btn').addEventListener('click', function (event) {

    const username = document.getElementById('userInput');
    const usernameValue = username.value;
    const password = document.getElementById('passInput');
    const passwordValue = password.value;
    
    if (usernameValue === 'admin' && passwordValue === 'admin123') {
        alert("Login successful!");
        window.location.href = 'issuepage.html';

    }
    else {
        alert('Incorrect username or password! Please enter the correct information.');
    }
});
