// Initialize variables
let accounts = {};
let currentAccount = null;

// Function to create a new account
function createAccount(username, password) {
    if (accounts[username]) {
        alert("Username already exists!");
        return;
    }
    accounts[username] = {
        balance: 0,
        password: password
    };
    alert("Account created successfully!");
}

// Function to login to an existing account
function login(username, password) {
    if (!accounts[username] || accounts[username].password !== password) {
        alert("Invalid username or password!");
        return;
    }
    currentAccount = username;
    document.getElementById("login-section").style.display = "none";
    document.getElementById("register-section").style.display = "none";
    document.getElementById("account-section").style.display = "block";
    updateBalance();
}

// Function to register a new account
function register() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    createAccount(username, password);
    document.getElementById("register-form").reset();
}

// Function to deposit money into the account
function deposit() {
    let amount = parseFloat(document.getElementById("amount").value);
    if (isNaN(amount) || amount <= 0) {
        alert("Invalid deposit amount!");
        return;
    }
    accounts[currentAccount].balance += amount;
    updateBalance();
    document.getElementById("deposit-form").reset();
}

// Function to withdraw money from the account
function withdraw() {
    let amount = parseFloat(document.getElementById("amount").value);
    if (isNaN(amount) || amount <= 0) {
        alert("Invalid withdrawal amount!");
        return;
    }
    if (amount > accounts[currentAccount].balance) {
        alert("Insufficient balance!");
        return;
    }
    accounts[currentAccount].balance -= amount;
    updateBalance();
    document.getElementById("withdraw-form").reset();
}

// Function to update the account balance
function updateBalance() {
    document.getElementById("balance").innerHTML = `Balance: $${accounts[currentAccount].balance}`;
}

// Add event listeners to buttons
document.getElementById("register-btn").addEventListener("click", register);
document.getElementById("login-btn").addEventListener("click", function() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    login(username, password);
});
document.getElementById("deposit-btn").addEventListener("click", deposit);
document.getElementById("withdraw-btn").addEventListener("click", withdraw);
