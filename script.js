
import BankAccount from "./bank-account.js";

const myAccount = new BankAccount();

const fmtCents = cents => `$${(cents / 100).toFixed(2)}`;

const fmtDate = date => date.toLocaleDateString(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric"
});

const balanceEl = document.getElementById("balanceAmount");
const ledgerBody = document.getElementById("ledgerBody");
const emptyState = document.getElementById("emptyState");
const countsEl = document.getElementById("counts");
const statusEl = document.getElementById("statusMsg");
const depositTotalEl = document.getElementById("depositTotal");
const withdrawTotalEl = document.getElementById("withdrawTotal");

function render() {
  balanceEl.textContent = fmtCents(myAccount.balanceCents);
  ledgerBody.innerHTML = "";

  let runningBalanceCents = 0;

  myAccount.transactions.forEach((transaction, index) => {
    runningBalanceCents += transaction.type === "deposit"
      ? transaction.amountCents
      : -transaction.amountCents;

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${String(index + 1).padStart(2, "0")}</td>
      <td>${fmtDate(transaction.date)}</td>
      <td><span class="tag ${transaction.type}">${transaction.type}</span></td>
      <td class="num">${transaction.type === "deposit" ? "+" : "−"}${fmtCents(transaction.amountCents)}</td>
      <td class="num">${fmtCents(runningBalanceCents)}</td>
    `;

    ledgerBody.appendChild(tr);
  });

  const transactionCount = myAccount.transactions.length;

  countsEl.textContent = `${transactionCount} ${
    transactionCount === 1 ? "entry" : "entries"
  }`;

  emptyState.style.display = transactionCount === 0 ? "block" : "none";

  const depositTotalCents = myAccount.transactions
    .filter(t => t.type === "deposit")
    .reduce((total, t) => total + t.amountCents, 0);

  const withdrawalTotalCents = myAccount.transactions
    .filter(t => t.type === "withdraw")
    .reduce((total, t) => total + t.amountCents, 0);

  depositTotalEl.textContent = depositTotalCents
    ? `Deposits: ${fmtCents(depositTotalCents)}`
    : "Deposits: —";

  withdrawTotalEl.textContent = withdrawalTotalCents
    ? `Withdrawals: ${fmtCents(withdrawalTotalCents)}`
    : "Withdrawals: —";
}

function showStatus(message, kind) {
  statusEl.textContent = message;
  statusEl.className = "status" + (kind ? ` ${kind}` : "");
}

function handleTransaction(type) {
  const input = document.getElementById(
    type === "deposit" ? "depositInput" : "withdrawInput"
  );

  const amount = input.value.trim() === "" ? NaN : Number(input.value);

  if (!Number.isFinite(amount)) {
    showStatus(`Enter an amount to ${type}.`, "error");
    return;
  }

  const result = type === "deposit"
    ? myAccount.deposit(amount)
    : myAccount.withdraw(amount);

  const success = result.startsWith("Successfully");

  showStatus(result, success ? "success" : "error");

  if (success) {
    input.value = "";
  }

  render();
}

document.getElementById("depositBtn").addEventListener("click", () => {
  handleTransaction("deposit");
});

document.getElementById("withdrawBtn").addEventListener("click", () => {
  handleTransaction("withdraw");
});

[
  document.getElementById("depositInput"),
  document.getElementById("withdrawInput")
].forEach(input => {
  input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();

      const buttonId = input.id === "depositInput"
        ? "depositBtn"
        : "withdrawBtn";

      document.getElementById(buttonId).click();
    }
  });
});

render();
