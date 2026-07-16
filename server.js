const express = require("express");
const fs = require("fs");
const path = require("path");

const config = require("./config");
const logger = require("./utils/logger");
const { blockchainReady } = require("./models");

const corsMiddleware = require("./middleware/cors.middleware");
const requestLogger = require("./middleware/logger.middleware");
const errorHandler = require("./middleware/errorHandler.middleware");
const notFound = require("./middleware/notFound.middleware");
const { apiLimiter } = require("./middleware/rateLimit.middleware");

const apiRoutes = require("./routes");
const healthRoutes = require("./routes/health.routes");

const app = express();

const portFile = path.join(__dirname, ".server-port");

const writePortFile = (port) => {
  fs.writeFileSync(portFile, String(port), "utf8");
};

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestLogger);

// Routes
app.use("/health", healthRoutes);
app.use("/api", apiLimiter, apiRoutes);

// React build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

// Error handling
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await blockchainReady;

  const portToUse = config.port;
  process.env.PORT = String(portToUse);
  writePortFile(portToUse);

  const server = app.listen(portToUse, () => {
    logger.sysinfo(`Environment : ${config.env}`);
    logger.info(`Server      : http://localhost:${portToUse}`);
    logger.info(`API         : http://localhost:${portToUse}/api`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      logger.error(`Port ${portToUse} is already in use.`);
      process.exit(1);
    }

    throw err;
  });

  return server;
};

startServer().catch((err) => {
  logger.error(`Failed to start server: ${err.message}`);
  process.exit(1);
});

module.exports = app;