import { useState, useEffect, useCallback, useRef } from "react";
import { fetchDashboard } from "../api/blockchain.api";
import { POLL_INTERVAL_MS } from "../constants";

const useBlockchain = (pollInterval = POLL_INTERVAL_MS) => {
  const [chain, setChain] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const intervalRef = useRef(null);
  const mountedRef = useRef(true);

  const refresh = useCallback(async () => {
    try {
      const { chainData, statsData } = await fetchDashboard();

      if (!mountedRef.current) return;

      setChain(chainData);
      setStats(statsData);
      setError(null);
    } catch (err) {
      if (!mountedRef.current) return;

      setError(
        err.message || "Failed to connect to the blockchain API."
      );
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    refresh();

    intervalRef.current = setInterval(() => {
      refresh();
    }, pollInterval);

    return () => {
      mountedRef.current = false;

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [refresh, pollInterval]);

  return {
    chain,
    stats,
    loading,
    error,
    refresh,
  };
};

export default useBlockchain;