const { v4: uuidv4 } = require("uuid");

const STATUSES = ["Pending", "Picked Up", "In Transit", "Delivered", "Cancelled"];

const seed = [
  {
    id: uuidv4(),
    sender: "Raj Mehta",
    receiver: "Priya Sharma",
    origin: "Mumbai",
    destination: "Delhi",
    status: "In Transit",
    createdAt: new Date("2025-05-10T09:00:00Z").toISOString(),
  },
  {
    id: uuidv4(),
    sender: "Anil Kapoor",
    receiver: "Sunita Verma",
    origin: "Pune",
    destination: "Bangalore",
    status: "Delivered",
    createdAt: new Date("2025-05-08T11:30:00Z").toISOString(),
  },
  {
    id: uuidv4(),
    sender: "Deepa Nair",
    receiver: "Kiran Rao",
    origin: "Chennai",
    destination: "Hyderabad",
    status: "Picked Up",
    createdAt: new Date("2025-05-11T08:15:00Z").toISOString(),
  },
  {
    id: uuidv4(),
    sender: "Vikram Singh",
    receiver: "Meena Joshi",
    origin: "Kolkata",
    destination: "Ahmedabad",
    status: "Pending",
    createdAt: new Date("2025-05-12T14:00:00Z").toISOString(),
  },
  {
    id: uuidv4(),
    sender: "Pooja Iyer",
    receiver: "Rahul Gupta",
    origin: "Jaipur",
    destination: "Surat",
    status: "Cancelled",
    createdAt: new Date("2025-05-07T16:45:00Z").toISOString(),
  },
  {
    id: uuidv4(),
    sender: "Amit Desai",
    receiver: "Neha Patil",
    origin: "Nagpur",
    destination: "Lucknow",
    status: "In Transit",
    createdAt: new Date("2025-05-09T10:00:00Z").toISOString(),
  },
  {
    id: uuidv4(),
    sender: "Sanjay Kumar",
    receiver: "Anjali Tiwari",
    origin: "Bhopal",
    destination: "Indore",
    status: "Delivered",
    createdAt: new Date("2025-05-06T12:30:00Z").toISOString(),
  },
];

module.exports = { seed, STATUSES };
