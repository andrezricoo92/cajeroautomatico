let accounts = {
  "Persona 1": { password: "1234", balance: 500 },
  "Persona 2": { password: "5678", balance: 300 },
  "Persona 3": { password: "2907", balance: 200 },
};

let selectedAccount = "";

function showElement(elementId) {
  document.getElementById(elementId).classList.remove("hidden");
}

function hideElement(elementId) {
  document.getElementById(elementId).classList.add("hidden");
}

function updateBalance(balance) {
  document.getElementById("transaction-result").innerText = `Nuevo saldo: $${balance}`;
}

function showError(message) {
  document.getElementById("transaction-error").innerText = message;
}

function resetForm() {
  document.getElementById("transaction-amount").value = "";
  document.getElementById("transaction-result").innerText = "";
  document.getElementById("transaction-error").innerText = "";
}

function checkBalance() {
  let balance = accounts[selectedAccount].balance;
  updateBalance(balance);
}

function depositAmount() {
  let transactionAmount = parseFloat(document.getElementById("transaction-amount").value);

  if (isNaN(transactionAmount)) {
    showError("Ingresa un monto válido.");
    return;
  }

  let balance = accounts[selectedAccount].balance;
  let newBalance = balance + transactionAmount;

  if (newBalance > 990) {
    showError("El monto excede el límite máximo de $990.");
    return;
  }

  accounts[selectedAccount].balance = newBalance;
  updateBalance(newBalance);
}

function withdrawAmount() {
  let transactionAmount = parseFloat(document.getElementById("transaction-amount").value);

  if (isNaN(transactionAmount)) {
    showError("Ingresa un monto válido.");
    return;
  }

  let balance = accounts[selectedAccount].balance;

  if (balance - transactionAmount < 10) {
    showError("El monto excede el límite mínimo de $10 o el saldo disponible.");
    return;
  }

  let newBalance = balance - transactionAmount;
  accounts[selectedAccount].balance = newBalance;
  updateBalance(newBalance);
}

function handleAccountSelection(event) {
  selectedAccount = event.target.getAttribute("data-account");
  showElement("password-input");
}

function handlePasswordSubmit() {
  let password = document.getElementById("password").value;

  if (password === accounts[selectedAccount].password) {
    hideElement("password-input");
    showElement("transaction-options");
  } else {
    document.getElementById("password-error").classList.remove("hidden");
  }
}

function initialize() {
  let accountButtons = document.getElementsByClassName("account-btn");

  for (let i = 0; i < accountButtons.length; i++) {
    accountButtons[i].addEventListener("click", handleAccountSelection);
  }

  document.getElementById("password-submit").addEventListener("click", handlePasswordSubmit);
  document.getElementById("check-balance").addEventListener("click", checkBalance);
  document.getElementById("deposit").addEventListener("click", depositAmount);
  document.getElementById("withdraw").addEventListener("click", withdrawAmount);
  document.getElementById("transaction-amount").addEventListener("input", resetForm);
}

initialize();







