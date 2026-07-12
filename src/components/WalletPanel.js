import React, { useState, useEffect } from 'react';
import './TransactionForm.css';
import { createWallet, fetchBalance } from '../api/blockchain.api';

const WalletPanel = ({
  refreshTrigger,
  activeWallet,
  setActiveWallet,
}) => {
  const [wallets, setWallets] = useState([]);
  const [activeWalletId, setActiveWalletId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [copiedField, setCopiedField] = useState('');
  const [showPrivateKeys, setShowPrivateKeys] = useState({});

  useEffect(() => {
    const savedWallets = localStorage.getItem("assessment-wallets");

    if (savedWallets) {
      try {
        const parsedWallets = JSON.parse(savedWallets);

        setWallets(parsedWallets);

        if (activeWallet) {
          setActiveWalletId(activeWallet.id);
        } else if (parsedWallets.length > 0) {
          setActiveWalletId(parsedWallets[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [activeWallet]);

  useEffect(() => {
    const updateBalances = async () => {
      const storedWallets = JSON.parse(
        localStorage.getItem("assessment-wallets") || "[]"
      );

      if (storedWallets.length === 0) return;

      try {
        const updatedWallets = await Promise.all(
          storedWallets.map(async (wallet) => {
            const response = await fetchBalance(wallet.publicKey);

            return {
              ...wallet,
              balance: response.balance,
            };
          })
        );

        setWallets(updatedWallets);

        localStorage.setItem(
          "assessment-wallets",
          JSON.stringify(updatedWallets)
        );

        if (activeWallet) {
          const refreshed = updatedWallets.find(
            (wallet) => wallet.id === activeWallet.id
          );

          if (
            refreshed &&
            refreshed.balance !== activeWallet.balance
          ) {
            setActiveWallet(refreshed);

            localStorage.setItem(
              "active-wallet",
              JSON.stringify(refreshed)
            );
          }
        }
      } catch (error) {
        console.error("Failed to refresh balances:", error);
      }
    };

    updateBalances();
  }, [
    refreshTrigger,
    activeWallet,
    setActiveWallet,
  ]);

  const handleCreateWallet = async () => {
    setLoading(true);
    setMessage('');

    try {
      const walletData = await createWallet();

      const balanceResponse = await fetchBalance(walletData.publicKey);

      const newWallet = {
        id: crypto.randomUUID(),
        nickname: `Wallet ${wallets.length + 1}`,
        publicKey: walletData.publicKey,
        privateKey: walletData.privateKey,
        balance: balanceResponse.balance,
        createdAt: new Date().toISOString(),
      };

      const updatedWallets = [...wallets, newWallet];

      setWallets(updatedWallets);

      setActiveWalletId(newWallet.id);

      setActiveWallet(newWallet);

      localStorage.setItem(
        "active-wallet",
        JSON.stringify(newWallet)
      );

      localStorage.setItem(
        "assessment-wallets",
        JSON.stringify(updatedWallets)
      );

      setMessage("Wallet created successfully");
    } catch (err) {
      setMessage(err.message || "Failed to create wallet");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (value, fieldName) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(fieldName);
      window.setTimeout(() => setCopiedField(''), 1500);
    } catch {
      setMessage("Unable to copy to clipboard");
    }
  };

  return (
    <div className="transaction-form">
      <h2 className="panel-title">Wallet Studio</h2>
      <p className="panel-subtitle">
        Generate a key pair and inspect balance.
      </p>

      <button
        type="button"
        className="submit-button"
        onClick={handleCreateWallet}
        disabled={loading}
      >
        {loading ? "Generating..." : "Create Wallet"}
      </button>

      {message && (
        <div
          className={`form-message ${message.includes("success") ? "success" : "error"
            }`}
        >
          {message}
        </div>
      )}

      <div className="wallet-note">
        Tip: copy your keys before leaving the page.
      </div>

      {wallets.length > 0 && (
        <div className="wallet-list">
          <h4 style={{ marginBottom: "15px" }}>
            Wallets ({wallets.length})
          </h4>

          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              className={`form-group ${activeWalletId === wallet.id
                ? "active-wallet"
                : ""
                }`}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h4>{wallet.nickname}</h4>

                {activeWalletId === wallet.id && (
                  <span className="active-badge">
                    ACTIVE
                  </span>
                )}
              </div>

              <small>
                Created{" "}
                {new Date(wallet.createdAt).toLocaleString()}
              </small>

              <br />
              <br />

              <label>Balance</label>

              <div className="field-value">
                {wallet.balance}
              </div>

              <br />

              <label>Public Key</label>

              <div className="value-row">
                <div className="field-value hash">
                  {wallet.publicKey}
                </div>

                <button
                  type="button"
                  className="copy-button"
                  onClick={() =>
                    handleCopy(
                      wallet.publicKey,
                      wallet.id + "-public"
                    )
                  }
                >
                  {copiedField === wallet.id + "-public"
                    ? "Copied!"
                    : "Copy"}
                </button>
              </div>

              <label>Private Key</label>

              <div className="value-row">
                <div className="field-value hash">
                  {showPrivateKeys[wallet.id]
                    ? wallet.privateKey
                    : "•".repeat(32)}
                </div>

                <button
                  type="button"
                  className="copy-button"
                  onClick={() =>
                    handleCopy(
                      wallet.privateKey,
                      wallet.id + "-private"
                    )
                  }
                >
                  {copiedField === wallet.id + "-private"
                    ? "Copied!"
                    : "Copy"}
                </button>
              </div>

              <button
                type="button"
                className="submit-button"
                style={{ marginTop: "10px" }}
                onClick={() =>
                  setShowPrivateKeys((prev) => ({
                    ...prev,
                    [wallet.id]: !prev[wallet.id],
                  }))
                }
              >
                {showPrivateKeys[wallet.id]
                  ? "Hide Private Key"
                  : "Show Private Key"}
              </button>

              <button
                type="button"
                className="submit-button"
                style={{
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
                onClick={() => {
                  setActiveWalletId(wallet.id);

                  setActiveWallet(wallet);

                  localStorage.setItem(
                    "active-wallet",
                    JSON.stringify(wallet)
                  );
                }}
              >
                Use Wallet
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WalletPanel;