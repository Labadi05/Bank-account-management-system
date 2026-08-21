# Ledger — Bank Account Management

A small `BankAccount` class (deposit, withdraw, balance, transaction history) with a passbook-styled web UI on top of it.

# 📚 Project Context 
 - I built This project as part of the freeCodeCamp Front End Development Libraries certification, fulfilling all required user stories for bank account management system project .
 - A small `BankAccount` class (deposit, withdraw, balance, transaction history) with a passbook-styled web UI on top of it.

## Live demo
Open `index.html` in a browser, or enable **GitHub Pages** for this repo (Settings → Pages → deploy from `main` branch, `/root`) and it'll be live at:

```
https://<Labadi05>.github.io/<Bank-account-management->/
```

## Files
- `bank-account.js` — the `BankAccount` class used for grading/tests (Node-friendly, no DOM).
- `index.html` — the UI markup.
- `styles.css` — passbook/ledger visual styling.
- `script.js` — the same `BankAccount` class plus the DOM logic that powers the UI.

## Features
- `deposit(amount)` — adds a deposit transaction and increases the balance.
- `withdraw(amount)` — adds a withdrawal transaction if funds are sufficient.
- `checkBalance()` — returns the current balance as a string.
- `listAllDeposits()` / `listAllWithdrawals()` — list transaction amounts by type.
- `listAllTransactions()` — lists every transaction with its type, amount, and timestamp.
- Every transaction now stores a `date` (a JS `Date`, set automatically at the moment of deposit/withdrawal), and the ledger UI shows a **Date** column alongside each entry.

## Running locally
No build step needed — just open `index.html` in a browser.

## Running tests
If you're using this with a test suite (e.g. Jest/Mocha) that requires `bank-account.js`:

```bash
npm install
npm test
```