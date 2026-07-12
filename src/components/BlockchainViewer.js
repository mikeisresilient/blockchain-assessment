import React from 'react';
import './BlockchainViewer.css';

const BlockchainViewer = ({ blockchain }) => {
  if (!blockchain || !blockchain.chain) {
    return (
      <div className="blockchain-viewer">
        <p>Loading blockchain data...</p>
      </div>
    );
  }

  // Load wallets from localStorage
  const wallets = JSON.parse(
    localStorage.getItem("assessment-wallets") || "[]"
  );

  const getWalletName = (address) => {
    if (!address) return "Mining Reward";

    const wallet = wallets.find(
      (wallet) => wallet.publicKey === address
    );

    return wallet ? wallet.nickname : "External Wallet";
  };

  const shorten = (text) => {
    if (!text) return "Mining Reward";

    if (text.length <= 18) return text;

    return `${text.slice(0, 8)}...${text.slice(-6)}`;
  };

  return (
    <div className="blockchain-viewer">
      <h2 className="panel-title">
        Blockchain ({blockchain.length} blocks)
      </h2>

      <div className="blocks-container">

        {blockchain.chain.map((block, index) => (

          <div
            key={index}
            className="block-card"
          >

            <div className="block-header">
              <span className="block-number">
                Block #{index}
              </span>

              {index === 0 && (
                <span className="genesis-badge">
                  Genesis
                </span>
              )}
            </div>

            <div className="block-content">

              <div className="block-field">
                <span className="field-label">
                  Hash:
                </span>

                <span
                  className="field-value hash"
                  title={block.hash}
                >
                  {shorten(block.hash)}
                </span>
              </div>

              <div className="block-field">
                <span className="field-label">
                  Previous Hash:
                </span>

                <span
                  className="field-value hash"
                  title={block.previousHash}
                >
                  {block.previousHash
                    ? shorten(block.previousHash)
                    : "N/A"}
                </span>
              </div>

              <div className="block-field">
                <span className="field-label">
                  Timestamp:
                </span>

                <span className="field-value">
                  {new Date(
                    block.timestamp
                  ).toLocaleString()}
                </span>
              </div>

              <div className="block-field">
                <span className="field-label">
                  Nonce:
                </span>

                <span className="field-value">
                  {block.nonce}
                </span>
              </div>

              <div className="block-field">
                <span className="field-label">
                  Transactions:
                </span>

                <span className="field-value">
                  {block.transactions?.length || 0}
                </span>
              </div>

              {block.transactions &&
                block.transactions.length > 0 && (

                <div className="transactions-list">

                  <div className="transactions-header">
                    Transactions
                  </div>

                  {block.transactions.map(
                    (tx, txIndex) => (

                      <div
                        key={txIndex}
                        className="transaction-item"
                      >

                        <div className="tx-from">

                          <span className="tx-label">
                            From:
                          </span>

                          <strong>
                            {getWalletName(tx.fromAddress)}
                          </strong>

                          <span
                            className="tx-address"
                            title={tx.fromAddress}
                          >
                            {shorten(tx.fromAddress)}
                          </span>

                        </div>

                        <div className="tx-arrow">
                          →
                        </div>

                        <div className="tx-to">

                          <span className="tx-label">
                            To:
                          </span>

                          <strong>
                            {getWalletName(tx.toAddress)}
                          </strong>

                          <span
                            className="tx-address"
                            title={tx.toAddress}
                          >
                            {shorten(tx.toAddress)}
                          </span>

                        </div>

                        <div className="tx-amount">
                          {tx.amount}
                        </div>

                      </div>

                    )
                  )}

                </div>

              )}

            </div>

          </div>

        ))}

      </div>
    </div>
  );
};

export default BlockchainViewer;