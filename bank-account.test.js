
import test from "node:test";
import assert from "node:assert/strict";
import BankAccount from "./bank-account.js";

test("a new account starts with a zero balance", () => {
  const account = new BankAccount();

  assert.equal(account.balanceCents, 0);
  assert.equal(account.transactions.length, 0);
});

test("deposit increases the account balance", () => {
  const account = new BankAccount();

  account.deposit(100);

  assert.equal(account.balanceCents, 10000);
});

test("withdrawal decreases the account balance", () => {
  const account = new BankAccount();

  account.deposit(100);
  account.withdraw(30);

  assert.equal(account.balanceCents, 7000);
});

test("account rejects a zero deposit", () => {
  const account = new BankAccount();

  account.deposit(0);

  assert.equal(account.balanceCents, 0);
  assert.equal(account.transactions.length, 0);
});

test("account rejects a withdrawal greater than its balance", () => {
  const account = new BankAccount();

  account.deposit(50);
  account.withdraw(100);

  assert.equal(account.balanceCents, 5000);
  assert.equal(account.transactions.length, 1);
});

test("account rejects amounts with more than two decimal places", () => {
  const account = new BankAccount();

  account.deposit(10.123);

  assert.equal(account.balanceCents, 0);
  assert.equal(account.transactions.length, 0);
});

test("deposit and withdrawal preserve accurate cents", () => {
  const account = new BankAccount();

  account.deposit(0.1);
  account.deposit(0.2);
  account.withdraw(0.1);

  assert.equal(account.balanceCents, 20);
});


test("each transaction receives a unique ID", () => {
  const account = new BankAccount();

  account.deposit(100);
  account.withdraw(25);
  account.deposit(50);

  const ids = account.transactions.map(transaction => transaction.id);

  assert.deepEqual(ids, [1, 2, 3]);
});

test("failed transactions do not create transaction records", () => {
  const account = new BankAccount();

  account.deposit(100);
  account.withdraw(200);
  account.deposit(-50);

  assert.equal(account.transactions.length, 1);
  assert.equal(account.balanceCents, 10000);
});

test("transaction history records the correct types and amounts", () => {
  const account = new BankAccount();

  account.deposit(75);
  account.withdraw(25);

  assert.equal(account.transactions[0].type, "deposit");
  assert.equal(account.transactions[0].amountCents, 7500);

  assert.equal(account.transactions[1].type, "withdraw");
  assert.equal(account.transactions[1].amountCents, 2500);
});



test("account rejects deposits that exceed the maximum safe balance", () => {
  const account = new BankAccount();

  const maximumSafeCents = Number.MAX_SAFE_INTEGER;

  account.balanceCents = maximumSafeCents;

  const result = account.deposit(0.01);

  assert.equal(
    result,
    "Deposit exceeds the maximum supported account balance."
  );

  assert.equal(account.balanceCents, maximumSafeCents);
  assert.equal(account.transactions.length, 0);
});
