const express = require("express");
const fetch = global.fetch;

const router = express.Router();

// const API_URL = "http://localhost:9001/orders";
const API_URL = "http://api-gateway:9001/orders";
/* ================= LIST ================= */
router.get("/", async (req, res) => {
  try {
    const response = await fetch(API_URL);
    const orders = await response.json();

    res.render("orders/list", { orders });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error fetching orders");
  }
});

/* ================= CREATE PAGE ================= */
router.get("/new", (req, res) => {
  res.render("orders/new");
});

/* ================= CREATE ================= */
router.post("/new", async (req, res) => {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...req.body,
        totalAmount: Number(req.body.totalAmount),
      }),
    });

    res.redirect("/orders");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating order");
  }
});

/* ================= EDIT PAGE ================= */
router.get("/edit/:id", async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/${req.params.id}`);
    const order = await response.json();

    res.render("orders/edit", { order });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading order");
  }
});

/* ================= UPDATE ================= */
router.post("/edit/:id", async (req, res) => {
  try {
    await fetch(`${API_URL}/${req.params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...req.body,
        totalAmount: Number(req.body.totalAmount),
      }),
    });

    res.redirect("/orders");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating order");
  }
});

/* ================= DELETE ================= */
router.post("/delete/:id", async (req, res) => {
  try {
    await fetch(`${API_URL}/${req.params.id}`, {
      method: "DELETE",
    });

    res.redirect("/orders");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting order");
  }
});

module.exports = router;