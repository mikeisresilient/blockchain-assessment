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


# Author

**Michael Uchechukwu Ege**

GitHub:

https://github.com/mikeisresilient

Other contact details:

linktr.ee/mikeisresilient

# License

This project was developed as a technical assessment and is intended for educational and demonstration purposes.
