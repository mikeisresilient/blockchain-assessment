import React, { useState, useEffect } from 'react';
import './App.css';

import BlockchainViewer from './components/BlockchainViewer';
import TransactionForm from './components/TransactionForm';
import WalletPanel from './components/WalletPanel';
import StatsPanel from './components/StatsPanel';
import Header from './components/Header';

import useBlockchain from './hooks/useBlockchain';
import { mineBlock } from './api/blockchain.api';

function App() {
  const { chain, stats, loading, error, refresh } = useBlockchain();

  const [activeWallet, setActiveWallet] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("active-wallet");

    if (saved) {
      setActiveWallet(JSON.parse(saved));
    }
  }, []);

  const handleMine = async () => {
    try {
      if (!activeWallet) {
        alert("Please select an active wallet first.");
        return;
      }

      await mineBlock(activeWallet.publicKey);

      await refresh();

    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Loading Blockchain...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />

      <div className="app-container">

        {error && (
          <div className="error-banner">
            <p>{error}</p>
          </div>
        )}

        <div className="main-content">

          <div className="left-panel">

            <StatsPanel
              stats={stats}
              onMine={handleMine}
            />

            <WalletPanel
              refreshTrigger={stats?.latestBlockHash}
              activeWallet={activeWallet}
              setActiveWallet={setActiveWallet}
            />

            <TransactionForm
              activeWallet={activeWallet}
              onTransactionAdded={refresh}
            />

          </div>

          <div className="right-panel">
            <BlockchainViewer blockchain={chain} />
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;