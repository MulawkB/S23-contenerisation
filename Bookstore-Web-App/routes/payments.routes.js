const express = require("express");
const fetch = global.fetch;

const router = express.Router();

/* const API_URL = "http://localhost:9001/payments";
const ORDER_API = "http://localhost:9001/orders"; */
const API_URL = "http://api-gateway:9001/payments";
const ORDER_API = "http://api-gateway:9001/orders";
async function getJSON(url) {
  const res = await fetch(url);
  const text = await res.text();

  if (!res.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}
/* ================= LIST ================= */
router.get("/", async (req, res) => {
  try {
    const payments = await getJSON(API_URL);
    res.render("payments/list", { payments });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error fetching payments");
  }
});

/* ================= NEW ================= */
router.get("/new", async (req, res) => {
  try {
    const orders = await getJSON(ORDER_API);
    res.render("payments/new", { orders });
  } catch (err) {
    console.error("NEW PAGE ERROR:", err.message);
    res.status(500).send("Error loading form");
  }
});

/* ================= CREATE ================= */
router.post("/new", async (req, res) => {
  try {
    const payload = {
      orderId: req.body.orderId,
      amount: Number(req.body.amount),
      paymentDate: req.body.paymentDate,
      paymentMethod: req.body.paymentMethod,
      status: req.body.status
    };

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    res.redirect("/payments");

  } catch (err) {
    console.error("CREATE ERROR:", err.message);
    res.status(500).send("Error creating payment");
  }
});

/* ================= EDIT ================= */
router.get("/edit/:id", async (req, res) => {
  try {
    const [payment, orders] = await Promise.all([
      getJSON(`${API_URL}/${req.params.id}`),
      getJSON(ORDER_API)
    ]);

    res.render("payments/edit", { payment, orders });

  } catch (err) {
    console.error("EDIT LOAD ERROR:", err.message);
    res.status(500).send("Error loading edit page");
  }
});

/* ================= UPDATE ================= */
router.post("/edit/:id", async (req, res) => {
  try {
    const payload = {
      orderId: req.body.orderId,
      amount: Number(req.body.amount),
      paymentDate: req.body.paymentDate,
      paymentMethod: req.body.paymentMethod,
      status: req.body.status
    };

    await fetch(`${API_URL}/${req.params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    res.redirect("/payments");

  } catch (err) {
    console.error("UPDATE ERROR:", err.message);
    res.status(500).send("Error updating payment");
  }
});

/* ================= DELETE ================= */
router.post("/delete/:id", async (req, res) => {
  try {
    await fetch(`${API_URL}/${req.params.id}`, {
      method: "DELETE",
    });

    res.redirect("/payments");

  } catch (err) {
    console.error("DELETE ERROR:", err.message);
    res.status(500).send("Error deleting payment");
  }
});

module.exports = router;