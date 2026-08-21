class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }
 
  deposit(amount) {
    if (amount > 0) {
      this.transactions.push({ type: "deposit", amount: amount, date: new Date() });
      this.balance += amount;
      return `Successfully deposited $${amount}. New balance: $${this.balance}`;
    } else {
      return "Deposit amount must be greater than zero.";
    }
  }
 
  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.transactions.push({ type: "withdraw", amount: amount, date: new Date() });
      this.balance -= amount;
      return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
    } else {
      return "Insufficient balance or invalid amount.";
    }
  }
 
  checkBalance() {
    return `Current balance: $${this.balance}`;
  }
 
  listAllDeposits() {
    const deposits = this.transactions
      .filter(transaction => transaction.type === "deposit")
      .map(transaction => transaction.amount);
    return `Deposits: ${deposits.join(",")}`;
  }
 
  listAllWithdrawals() {
    const withdrawals = this.transactions
      .filter(transaction => transaction.type === "withdraw")
      .map(transaction => transaction.amount);
    return `Withdrawals: ${withdrawals.join(",")}`;
  }
 
  // Returns every transaction with a human-readable date, e.g.
  // "deposit: $200 on 8/21/2026, 3:04:10 PM"
  listAllTransactions() {
    return this.transactions
      .map(t => `${t.type}: $${t.amount} on ${t.date.toLocaleString()}`)
      .join(" | ");
  }
}
 
const myAccount = new BankAccount();
myAccount.deposit(200);
myAccount.deposit(100);
myAccount.withdraw(50);
myAccount.withdraw(30);
myAccount.deposit(20);
 
module.exports = BankAccount;