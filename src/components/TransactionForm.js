import React, { useState, useEffect } from 'react';
import './TransactionForm.css';
import { addTransaction } from '../api/blockchain.api';

const TransactionForm = ({ activeWallet, onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    fromAddress: '',
    toAddress: '',
    amount: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState('');

  // Keep sender synchronized with active wallet
  useEffect(() => {
    if (activeWallet) {
      setFormData((prev) => ({
        ...prev,
        fromAddress: activeWallet.publicKey,
      }));
    }
  }, [activeWallet]);

  // Reload wallets whenever the active wallet changes
  useEffect(() => {
    const loadWallets = () => {
      try {
        const savedWallets = JSON.parse(
          localStorage.getItem('assessment-wallets') || '[]'
        );

        setWallets(savedWallets);
      } catch (error) {
        console.error('Failed to load wallets:', error);
      }
    };

    loadWallets();
  }, [activeWallet]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    try {
      await addTransaction(
        formData.fromAddress,
        formData.toAddress,
        formData.amount
      );

      setMessage('Transaction added successfully!');

      setFormData({
        fromAddress: activeWallet?.publicKey || '',
        toAddress: '',
        amount: '',
      });

      setSelectedWallet('');

      onTransactionAdded();

      // Refresh wallets after transaction
      const updatedWallets = JSON.parse(
        localStorage.getItem('assessment-wallets') || '[]'
      );

      setWallets(updatedWallets);

    } catch (err) {
      setMessage(err.message || 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transaction-form">
      <h2 className="panel-title">Create Transaction</h2>

      <form onSubmit={handleSubmit}>
        <p className="panel-subtitle">
          Use a wallet public key to create blockchain transactions.
        </p>

        <div className="form-group">
          <label htmlFor="fromAddress">From Address</label>

          <input
            type="text"
            id="fromAddress"
            name="fromAddress"
            value={formData.fromAddress}
            readOnly
            required
          />
        </div>

        <small className="wallet-note">
          Using the active wallet. Change it anytime from Wallet Studio.
        </small>

        <div className="form-group">
          <label htmlFor="walletSelect">
            Recipient Wallet
          </label>

          <select
            id="walletSelect"
            className="wallet-select"
            value={selectedWallet}
            onChange={(e) => {
              setSelectedWallet(e.target.value);

              setFormData((prev) => ({
                ...prev,
                toAddress: e.target.value,
              }));
            }}
          >
            <option value="">
              Select one of your wallets
            </option>

            {wallets
              .filter(
                (wallet) =>
                  wallet.publicKey !== formData.fromAddress
              )
              .map((wallet) => (
                <option
                  key={wallet.id}
                  value={wallet.publicKey}
                >
                  {`${wallet.nickname} • Balance: ${wallet.balance}`}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="toAddress">
            Or External Address
          </label>

          <input
            type="text"
            id="toAddress"
            name="toAddress"
            value={formData.toAddress}
            onChange={handleChange}
            placeholder="Wallet public key"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>

          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        {message && (
          <div
            className={`form-message ${message.includes('success')
                ? 'success'
                : 'error'
              }`}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;