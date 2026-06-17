const express = require("express");
const fetch = global.fetch;

const router = express.Router();

// const API_URL = "http://localhost:9001/inventory";
const API_URL = "http://api-gateway:9001/inventory";

async function getJSON(url) {
  const res = await fetch(url);
  const text = await res.text();

  if (!res.ok) {
    throw new Error(text || "Request failed");
  }

  try {
    return text ? JSON.parse(text) : null;
  } catch (err) {
    console.error("Invalid JSON from:", url);
    return null;
  }
}

// NORMALIZE RESPONSE
function toArray(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.inventory)) return data.inventory;
  if (Array.isArray(data?.books)) return data.books;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

// LIST INVENTORY

router.get("/", async (req, res) => {
  try {
    const data = await getJSON(API_URL);
    const inventory = toArray(data);

    return res.render("inventory/list", { inventory });
  } catch (err) {
    console.error("LIST ERROR:", err.message);
    return res.render("inventory/list", { inventory: [] });
  }
});

// NEW PAGE
router.get("/new", (req, res) => {
  res.render("inventory/new");
});

// CREATE ITEM
router.post("/new", async (req, res) => {
  try {
    const payload = {
      title: req.body.title?.trim(),
      author: req.body.author?.trim() || "unknown",
      stock: String(req.body.quantity || 0),
      price: String(req.body.price || 0),
    };

    const resApi = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!resApi.ok) {
      const text = await resApi.text();
      throw new Error(text);
    }

    return res.redirect("/inventory");
  } catch (err) {
    console.error("CREATE ERROR:", err.message);
    return res.status(500).send("Error creating inventory item");
  }
});

// EDIT PAGE
router.get("/edit/:id", async (req, res) => {
  try {
    const item = await getJSON(`${API_URL}/${req.params.id}`);

    if (!item) {
      return res.status(404).send("Item not found");
    }

    return res.render("inventory/edit", { item });
  } catch (err) {
    console.error("EDIT LOAD ERROR:", err.message);
    return res.status(500).send("Error loading item");
  }
});

// UPDATE ITEM
router.post("/edit/:id", async (req, res) => {
  try {
    const payload = {
      title: req.body.title?.trim(),
      author: req.body.author?.trim() || "unknown",
      stock: String(req.body.quantity || 0),
      price: String(req.body.price || 0),
    };

    const resApi = await fetch(`${API_URL}/${req.params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!resApi.ok) {
      const text = await resApi.text();
      throw new Error(text);
    }

    return res.redirect("/inventory");
  } catch (err) {
    console.error("UPDATE ERROR:", err.message);
    return res.status(500).send("Error updating inventory item");
  }
});

// DELETE ITEM
router.post("/delete/:id", async (req, res) => {
  try {
    const resApi = await fetch(`${API_URL}/${req.params.id}`, {
      method: "DELETE",
    });

    if (!resApi.ok) {
      const text = await resApi.text();
      throw new Error(text);
    }

    return res.redirect("/inventory");
  } catch (err) {
    console.error("DELETE ERROR:", err.message);
    return res.status(500).send("Error deleting inventory item");
  }
});

module.exports = router;