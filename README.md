# Blockchain Assessment Platform

A full stack blockchain application built with **React**, **Express.js**, and **JavaScript** that demonstrates the core concepts of blockchain technology, including wallet generation, transaction processing, proof of work mining, blockchain validation, and persistent storage.

This project was developed as a technical assessment to showcase backend architecture, frontend integration, and blockchain fundamentals.

## Features

### Wallet Management

* Generate public/private key wallet pairs
* Manage multiple wallets
* Select an active wallet
* Display wallet balances
* Copy wallet keys
* Toggle private key visibility

### Blockchain Transactions

* Create transactions between wallets
* Support external wallet addresses
* Validate transactions before adding them to the blockchain
* Track pending transactions

### Mining

* Proof of Work mining
* Automatic mining rewards
* Pending transaction confirmation
* Dynamic mining availability

### Blockchain Explorer

* View every block in the chain
* Display block hashes
* Display previous hashes
* Display timestamps
* Display nonce values
* View all transactions contained in each block
* Display mining reward transactions

### Chain Validation

* Blockchain integrity verification
* Hash validation
* Previous hash validation
* Transaction signature verification
* Chain status indicator

### Persistence

* Blockchain state automatically saved to disk
* Blockchain restored after server restart
* Wallet balances preserved


# Tech Stack

## Frontend

* React
* JavaScript
* CSS
* Axios

## Backend

* Node.js
* Express.js

## Blockchain

* SHA-256 Hashing
* Proof of Work
* Elliptic Curve Cryptography (secp256k1)
* Digital Signatures

## Development Tools

* Nodemon
* ESLint


# Project Structure
.
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── contracts/
├── src/
│   ├── api/
│   ├── components/
│   ├── hooks/
│   └── constants/
├── server.js
└── package.json


# Architecture

The backend follows a layered architecture:

Routes
      ↓
Controllers
      ↓
Models / Services
      ↓
Persistence

Business logic is separated from routing to improve maintainability and readability.


# API Endpoints

## Blockchain

| Method | Endpoint        | Description             |
| ------ | --------------- | ----------------------- |
| GET    | `/api/chain`    | Retrieve the blockchain |
| GET    | `/api/stats`    | Blockchain statistics   |
| GET    | `/api/validate` | Validate blockchain     |

## Transactions

| Method | Endpoint                    | Description          |
| ------ | --------------------------- | -------------------- |
| POST   | `/api/transactions`         | Create transaction   |
| GET    | `/api/transactions`         | Get all transactions |
| GET    | `/api/transactions/pending` | Pending transactions |

## Mining

| Method | Endpoint    | Description               |
| ------ | ----------- | ------------------------- |
| POST   | `/api/mine` | Mine pending transactions |

## Wallets

| Method | Endpoint                | Description        |
| ------ | ----------------------- | ------------------ |
| POST   | `/api/wallets`          | Generate wallet    |
| GET    | `/api/balance/:address` | Get wallet balance |

---

# Prerequisites

Before running the project, ensure the following are installed:

- Node.js v22.x (tested with v22.23.1)
- npm v10.x (tested with v10.9.8)
- Git

You can verify your installation using:

node -v
npm -v

# Installation

Clone the repository:

git clone https://github.com/mikeisresilient/blockchain-assessment.git


Move into the project:

cd blockchain-assessment

Install dependencies:

npm install

Create your environment file

cp .env.example .env


# Running the Project

Start the React application:

npm start

Start the backend server:

npm run dev

The application will be available at

Frontend:

http://localhost:3000


Backend:

http://localhost:3002


# Typical Workflow

1. Create one or more wallets.
2. Select an active wallet.
3. Create a transaction.
4. Observe the pending transaction count.
5. Mine a block.
6. Receive the mining reward.
7. Verify wallet balances.
8. Explore the newly created block.


# Blockchain Concepts Demonstrated

* Blockchain structure
* Genesis block
* SHA-256 hashing
* Proof of Work
* Mining rewards
* Pending transactions
* Chain validation
* Digital signatures
* Wallet generation
* Public/private key cryptography
* Persistent blockchain storage


# Future Improvements

* Wallet authentication
* Peer-to-peer networking
* Merkle trees
* Adjustable mining difficulty
* Transaction fees
* REST API documentation
* Docker support
* Automated unit tests
* Smart contract deployment using Hardhat
* User authentication


# Assessment Objectives Covered

* Layered backend architecture
* Blockchain implementation
* Wallet generation
* Transaction processing
* Mining workflow
* Blockchain persistence
* React frontend integration
* RESTful API design
* Clean project structure
* Documentation

# HOW TO USE

Once the frontend and backend servers are running, open your browser and navigate to:

The application consists of four main sections:

* Blockchain Statistics
* Wallet Studio
* Create Transaction
* Blockchain Explorer

## 1. Create Wallets

Begin by creating at least two wallets.

* Click **Create Wallet**.
* A new wallet will be generated with:

  * Public Key
  * Private Key
  * Balance
  * Repeat the process to create multiple wallets.

The newest wallet automatically becomes the active wallet.


## 2. Select an Active Wallet

Each wallet has a **Use Wallet** button.

Click **Use Wallet** to choose the wallet that will send transactions and receive mining rewards.

The active wallet is highlighted with an **ACTIVE** badge.


## 3. Create a Transaction

Navigate to the **Create Transaction** section.

* The **From Address** is automatically filled using the active wallet.
* Select another wallet from the **Recipient Wallet** dropdown or enter an external wallet address.
* Enter an amount.
* Click **Add Transaction**.

The transaction is added to the pool of pending transactions.


## 4. Mine Pending Transactions

After creating a transaction:

* The **Pending Transactions** count increases.
* The **Mine Block** button becomes enabled.

Click **Mine Block** to:

* Confirm pending transactions.
* Create a new block.
* Receive the mining reward in the active wallet.

If there are no pending transactions, the mining button is disabled.


## 5. Verify Wallet Balances

Return to **Wallet Studio**.

After mining:

* Sender balance decreases.
* Recipient balance increases.
* Mining reward is credited to the active wallet.

Wallet balances update automatically.


## 6. Explore the Blockchain

The **Blockchain Explorer** displays every block in the chain.

Each block shows:

* Block Number
* Hash
* Previous Hash
* Timestamp
* Nonce
* Transactions

Mining reward transactions are clearly identified.


## 7. Validate the Blockchain

The **Blockchain Statistics** panel displays:

* Chain Length
* Pending Transactions
* Mining Reward
* Difficulty
* Chain Status

A successful workflow should show:

* Pending Transactions = 0
* Chain Status = ✓ Valid


## Example Test Scenario

To verify the application's core functionality:

1. Create Wallet A.
2. Create Wallet B.
3. Select Wallet A as the active wallet.
4. Create a transaction sending **25** coins to Wallet B.
5. Confirm that **Pending Transactions** becomes **1**.
6. Click **Mine Block**.
7. Verify that:

   * Wallet B receives **25** coins.
   * The active wallet receives the mining reward.
   * Pending Transactions returns to **0**.
   * Chain Status remains **✓ Valid**.
   * A new block appears in the Blockchain Explorer.




# Author

**Michael Uchechukwu Ege**

GitHub:

https://github.com/mikeisresilient

Other contact details:

linktr.ee/mikeisresilient

# License

This project was developed as a technical assessment and is intended for educational and demonstration purposes.
