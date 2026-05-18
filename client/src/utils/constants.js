export const STATUSES = ["Pending", "Picked Up", "In Transit", "Delivered", "Cancelled"];

export const STATUS_META = {
  Pending:     { color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  dot: "#f59e0b" },
  "Picked Up": { color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  dot: "#3b82f6" },
  "In Transit":{ color: "#8b5cf6", bg: "rgba(139,92,246,0.12)",  dot: "#8b5cf6" },
  Delivered:   { color: "#10b981", bg: "rgba(16,185,129,0.12)",  dot: "#10b981" },
  Cancelled:   { color: "#ef4444", bg: "rgba(239,68,68,0.12)",   dot: "#ef4444" },
};

export const TRANSITIONS = {
  Pending:     ["Picked Up", "Cancelled"],
  "Picked Up": ["In Transit", "Cancelled"],
  "In Transit":["Delivered", "Cancelled"],
  Delivered:   [],
  Cancelled:   [],
};
