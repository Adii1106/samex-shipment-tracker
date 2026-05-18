const express = require("express");
const cors = require("cors");
const { seed } = require("./data");
const { authMiddleware, login } = require("./auth");
const { router: shipmentRouter, setStore } = require("./routes");

const app = express();
const PORT = process.env.PORT || 5001;

// In-memory store seeded with data
const store = [...seed];
setStore(store);

app.use(cors());
app.use(express.json());

// Auth
app.post("/api/auth/login", login);

// Protected shipment routes
app.use("/api/shipments", authMiddleware, shipmentRouter);

// Health check
app.get("/api/health", (_, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
