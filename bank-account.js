
export default class BankAccount {
  constructor() {
    // Store money in cents to avoid floating-point errors.
    this.balanceCents = 0;
    this.transactions = [];
    this.nextTransactionId = 1;
  }

  // Convert cents into a dollar amount for the interface.
  get balance() {
    return this.balanceCents / 100;
  }

  // Validate and convert a dollar amount into cents.
  convertToCents(amount) {
    if (
      typeof amount !== "number" ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return null;
    }

    const cents = Math.round(amount * 100);

    // Reject amounts with more than two decimal places.
    if (
      cents > Number.MAX_SAFE_INTEGER ||
      Math.abs(amount * 100 - cents) > 0.000001
    ) {
      return null;
    }

    return cents;
  }

  deposit(amount) {
    const cents = this.convertToCents(amount);

    if (cents === null) {
      return "Enter a valid deposit amount with up to two decimal places.";
    }

    if (!Number.isSafeInteger(this.balanceCents + cents)) {
      return "Deposit exceeds the maximum supported account balance.";
    }

     this.balanceCents += cents;

    this.transactions.push({
      id: this.nextTransactionId++,
      type: "deposit",
      amountCents: cents,
      amount: cents / 100,
      date: new Date()
    });

    return `Successfully deposited $${(cents / 100).toFixed(2)}. New balance: $${this.balance.toFixed(2)}`;
  }

  withdraw(amount) {
    const cents = this.convertToCents(amount);

    if (cents === null) {
      return "Enter a valid withdrawal amount with up to two decimal places.";
    }

    if (cents > this.balanceCents) {
      return "Insufficient balance.";
    }

    this.balanceCents -= cents;

    this.transactions.push({
      id: this.nextTransactionId++,
      type: "withdraw",
      amountCents: cents,
      amount: cents / 100,
      date: new Date()
    });

    return `Successfully withdrew $${(cents / 100).toFixed(2)}. New balance: $${this.balance.toFixed(2)}`;
  }

  checkBalance() {
    return `Current balance: $${this.balance.toFixed(2)}`;
  }

  listAllDeposits() {
    const deposits = this.transactions
      .filter(transaction => transaction.type === "deposit")
      .map(transaction => transaction.amount);

    return `Deposits: ${deposits.join(", ")}`;
  }

  listAllWithdrawals() {
    const withdrawals = this.transactions
      .filter(transaction => transaction.type === "withdraw")
      .map(transaction => transaction.amount);

    return `Withdrawals: ${withdrawals.join(", ")}`;
  }

  listAllTransactions() {
    return this.transactions
      .map(transaction =>
        `${transaction.type}: $${transaction.amount.toFixed(2)} on ${transaction.date.toLocaleString()}`
      )
      .join(" | ");
  }
deleteTransaction(transactionId) {
  const transactionIndex = this.transactions.findIndex(
    transaction => transaction.id === transactionId
  );

  if (transactionIndex === -1) {
    return "Transaction not found.";
  }

  // Remove the selected transaction.
  this.transactions.splice(transactionIndex, 1);

  // Recalculate the account balance from the remaining history.
  this.balanceCents = this.transactions.reduce(
    (balance, transaction) => {
      return transaction.type === "deposit"
        ? balance + transaction.amountCents
        : balance - transaction.amountCents;
    },
    0
  );

  return "Transaction deleted successfully.";
}
}
