const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const { STATUSES } = require("./data");

const router = Router();

// In-memory store (injected from index.js)
let store;
const setStore = (s) => { store = s; };

const VALID_TRANSITIONS = {
  Pending: ["Picked Up", "Cancelled"],
  "Picked Up": ["In Transit", "Cancelled"],
  "In Transit": ["Delivered", "Cancelled"],
  Delivered: [],
  Cancelled: [],
};

// GET /api/shipments
router.get("/", (req, res) => {
  const { status, destination } = req.query;
  let results = [...store];

  if (status && STATUSES.includes(status)) {
    results = results.filter((s) => s.status === status);
  }
  if (destination) {
    const q = destination.toLowerCase();
    results = results.filter((s) => s.destination.toLowerCase().includes(q));
  }

  res.json(results);
});

// POST /api/shipments
router.post("/", (req, res) => {
  const { sender, receiver, origin, destination } = req.body;

  const missing = ["sender", "receiver", "origin", "destination"].filter(
    (f) => !req.body[f]?.trim()
  );
  if (missing.length) {
    return res.status(400).json({ error: `Missing fields: ${missing.join(", ")}` });
  }

  const shipment = {
    id: uuidv4(),
    sender: sender.trim(),
    receiver: receiver.trim(),
    origin: origin.trim(),
    destination: destination.trim(),
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  store.push(shipment);
  res.status(201).json(shipment);
});

// PATCH /api/shipments/:id/status
router.patch("/:id/status", (req, res) => {
  const shipment = store.find((s) => s.id === req.params.id);
  if (!shipment) return res.status(404).json({ error: "Shipment not found" });

  const { status } = req.body;
  if (!STATUSES.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Valid: ${STATUSES.join(", ")}` });
  }

  const allowed = VALID_TRANSITIONS[shipment.status] || [];
  if (!allowed.includes(status)) {
    return res.status(400).json({
      error: `Cannot transition from "${shipment.status}" to "${status}"`,
    });
  }

  shipment.status = status;
  res.json(shipment);
});

module.exports = { router, setStore };
