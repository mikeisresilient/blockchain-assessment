const persistenceService = require("./persistence.service");
const { Blockchain } = require("../models/blockchain");
const config = require("../config");

class BlockchainService {
  constructor() {
    this.blockchain = new Blockchain(
      config.blockchain.difficulty,
      config.blockchain.miningReward
    );
    this.ready = false;
  }

  async initialize() {
    const restored = await persistenceService.load();

    if (restored) {
      this.blockchain = restored;
    }

    this.ready = true;
  }

  getChain() {
    return this.blockchain;
  }

  async save() {
    await persistenceService.save(this.blockchain);
  }
}

module.exports = new BlockchainService();