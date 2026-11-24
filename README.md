# Bank Account Management System

A browser-based banking account management application built with HTML, CSS, and JavaScript. This project focuses on core banking operations, accurate financial calculations, transaction management, and a clean user interface.

The application is being developed incrementally, with an emphasis on maintainable code, automated testing, and practical JavaScript concepts.

## Features

### Banking Operations
- Deposit money into an account.
- Withdraw money from an account.
- View the current account balance.
- Prevent withdrawals that exceed the available balance.
- Validate transaction amounts.
- Store monetary values in cents to avoid floating-point calculation errors.

### Transaction Management
- Maintain a complete transaction history.
- Assign unique IDs to transactions.
- Filter transactions by type:
- All transactions
- Deposits
- Withdrawals
- Search transactions by exact amount.
- Sort transactions by:
- Newest first
- Oldest first
- Highest amount
- Lowest amount
- Delete individual transactions with confirmation.
- Automatically recalculate the account balance after deletion.
- Display running balances and deposit/withdrawal totals.

### Data Persistence
- Save account transactions using browser Local Storage.
- Restore transaction history after refreshing the page.
- Recalculate the account balance from restored transactions.
- Preserve transaction IDs across browser sessions.

### Automated Testing
- Automated tests using Node.js's built-in test runner.
- Tests for deposits and withdrawals.
- Tests for balance accuracy.
- Tests for invalid transaction amounts.
- Tests for insufficient funds.
- Tests for unique transaction IDs.
- Tests for transaction history.
- Tests for safe balance limits.
- Tests for transaction deletion and balance recalculation.

## Technologies Used

- **HTML5** – Application structure.
- **CSS3** – Styling and responsive layout.
- **JavaScript (ES Modules)** – Banking logic and application functionality.
- **Node.js Test Runner** – Automated testing.
- **Git and GitHub** – Version control and project collaboration.
- **Browser Local Storage** – Client-side data persistence.


## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Labadi05/Bank-account-management-system.git
```

### 2. Navigate to the project folder

```bash
cd Bank-account-management-system
```

### 3. Open the project

Open the project folder in Visual Studio Code.

Use the Live Server extension to launch `index.html` in your browser.

### 4. Run automated tests

Make sure Node.js is installed, then run:

```bash
node --test bank-account.test.js
```

## How the Application Works

The banking engine is implemented in `bank-account.js` as a JavaScript class.

The main banking operations include:

- `deposit()` – Adds money to the account.
- `withdraw()` – Removes money when sufficient funds are available.
- `checkBalance()` – Returns the current account balance.
- `listAllDeposits()` – Lists deposit transactions.
- `listAllWithdrawals()` – Lists withdrawal transactions.
- `listAllTransactions()` – Returns the transaction history.
- `deleteTransaction()` – Removes a transaction and recalculates the balance.

The frontend logic in `script.js` connects the banking engine to the user interface and handles transaction rendering, filtering, sorting, deletion, and data persistence.

## Development Roadmap

Planned improvements include:

- CSV export of transaction history.
- Stronger validation of restored Local Storage data.
- Additional automated tests.
- Transaction categories.
- Account statements and reporting.
- Dashboard analytics.
- Multiple account support.
- Backend and database integration.
- User authentication and authorization.

## Current Project Status

The project has completed its initial banking engine foundation, including core account operations, transaction management, automated tests, and browser-based persistence.

Development is ongoing, with additional features and improvements being introduced incrementally.

## Important Note

This project is an educational application and demonstration of JavaScript development practices. It is not a production banking system and should not be used to store or manage real financial information.

## Author

**Labadi05**

GitHub: https://github.com/Labadi05

---

*Built as a continuous learning project, with a focus on clean code, testing, and incremental development.*