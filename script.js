
import BankAccount from "./bank-account.js";

const myAccount = new BankAccount();

// Format cents as a dollar amount.
const fmtCents = cents => `$${(cents / 100).toFixed(2)}`;

// Format transaction dates.
const fmtDate = date => date.toLocaleDateString(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric"
});

// Connect JavaScript to the HTML elements.
const balanceEl = document.getElementById("balanceAmount");
const ledgerBody = document.getElementById("ledgerBody");
const emptyState = document.getElementById("emptyState");
const countsEl = document.getElementById("counts");
const statusEl = document.getElementById("statusMsg");
const depositTotalEl = document.getElementById("depositTotal");
const withdrawTotalEl = document.getElementById("withdrawTotal");

const transactionFilter = document.getElementById("transactionFilter");
const amountSearch = document.getElementById("amountSearch");
const sortTransactions = document.getElementById("sortTransactions");

// Display the account and transaction history.
function render() {
  balanceEl.textContent = fmtCents(myAccount.balanceCents);

  // Clear the old table rows before drawing them again.
  ledgerBody.innerHTML = "";

  // Read the current filter selections.
  const selectedType = transactionFilter.value;
  const searchAmount = amountSearch.value.trim();

  // Convert the search amount into cents.
  const searchCents = searchAmount === ""
    ? null
    : Math.round(Number(searchAmount) * 100);

  // Calculate the running balance using the complete history.
  let runningBalanceCents = 0;

  const transactionsWithBalances = myAccount.transactions.map(
    (transaction, index) => {
      runningBalanceCents += transaction.type === "deposit"
        ? transaction.amountCents
        : -transaction.amountCents;

      return {
        transaction,
        index,
        runningBalanceCents
      };
    }
  );

 // Apply the selected filters.
const filteredTransactions = transactionsWithBalances.filter(
  ({ transaction }) => {
    const matchesType =
      selectedType === "all" ||
      transaction.type === selectedType;

    const matchesAmount =
      searchCents === null ||
      transaction.amountCents === searchCents;

    return matchesType && matchesAmount;
  }
);

// Sort the filtered transactions.
const sortOrder = sortTransactions.value;

filteredTransactions.sort((a, b) => {
  switch (sortOrder) {
    case "oldest":
      return a.index - b.index;

    case "highest":
      return b.transaction.amountCents - a.transaction.amountCents;

    case "lowest":
      return a.transaction.amountCents - b.transaction.amountCents;

    case "newest":
    default:
      return b.index - a.index;
  }
});

  // Display the filtered transactions.
  filteredTransactions.forEach(
    ({ transaction, index, runningBalanceCents }) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${String(index + 1).padStart(2, "0")}</td>
        <td>${fmtDate(transaction.date)}</td>
        <td>
          <span class="tag ${transaction.type}">
            ${transaction.type}
          </span>
        </td>
        <td class="num">
          ${transaction.type === "deposit" ? "+" : "−"}${fmtCents(transaction.amountCents)}
        </td>
        <td class="num">${fmtCents(runningBalanceCents)}</td>
      `;

      ledgerBody.appendChild(tr);
    }
  );

  // Update the number of visible transactions.
  const transactionCount = filteredTransactions.length;

  countsEl.textContent = `${transactionCount} ${
    transactionCount === 1 ? "entry" : "entries"
  }`;

  // Show an appropriate empty-state message.
  emptyState.style.display = transactionCount === 0
    ? "block"
    : "none";

  if (myAccount.transactions.length === 0) {
    emptyState.textContent =
      "No entries yet — make a deposit to open the ledger.";
  } else {
    emptyState.textContent =
      "No transactions match your filters.";
  }

  // Calculate totals using the complete transaction history.
  const depositTotalCents = myAccount.transactions
    .filter(transaction => transaction.type === "deposit")
    .reduce((total, transaction) => {
      return total + transaction.amountCents;
    }, 0);

  const withdrawalTotalCents = myAccount.transactions
    .filter(transaction => transaction.type === "withdraw")
    .reduce((total, transaction) => {
      return total + transaction.amountCents;
    }, 0);

  // Display deposit and withdrawal totals.
  depositTotalEl.textContent = depositTotalCents
    ? `Deposits: ${fmtCents(depositTotalCents)}`
    : "Deposits: —";

  withdrawTotalEl.textContent = withdrawalTotalCents
    ? `Withdrawals: ${fmtCents(withdrawalTotalCents)}`
    : "Withdrawals: —";
}

// Display success and error messages.
function showStatus(message, kind) {
  statusEl.textContent = message;
  statusEl.className = "status" + (kind ? ` ${kind}` : "");
}

// Handle deposits and withdrawals.
function handleTransaction(type) {
  const input = document.getElementById(
    type === "deposit" ? "depositInput" : "withdrawInput"
  );

  const amount = input.value.trim() === ""
    ? NaN
    : Number(input.value);

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

// Deposit button.
document.getElementById("depositBtn").addEventListener("click", () => {
  handleTransaction("deposit");
});

// Withdrawal button.
document.getElementById("withdrawBtn").addEventListener("click", () => {
  handleTransaction("withdraw");
});

// Allow Enter to submit a deposit or withdrawal.
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

// Update the ledger when the transaction type changes.
transactionFilter.addEventListener("change", render);

// Update the ledger while searching by amount.
amountSearch.addEventListener("input", render);

sortTransactions.addEventListener("change", render);
// Display the initial account state.
render();
