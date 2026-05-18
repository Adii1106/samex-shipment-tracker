import { useState, useCallback } from "react";
import { api } from "../utils/api";

export function useShipments() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchShipments = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getShipments(filters);
      setShipments(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createShipment = useCallback(async (formData) => {
    const shipment = await api.createShipment(formData);
    setShipments((prev) => [shipment, ...prev]);
    return shipment;
  }, []);

  const updateStatus = useCallback(async (id, status) => {
    const updated = await api.updateStatus(id, status);
    setShipments((prev) => prev.map((s) => (s.id === id ? updated : s)));
    return updated;
  }, []);

  return { shipments, loading, error, fetchShipments, createShipment, updateStatus };
}
