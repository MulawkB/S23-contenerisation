const express = require('express');
const app = express();

app.use(express.json());

const fetch = global.fetch;
/*
const ORDER_SERVICE = 'http://localhost:3001';
const PAYMENT_SERVICE = 'http://localhost:3002';
const INVENTORY_SERVICE = 'http://localhost:3000'; */
const INVENTORY_SERVICE = 'http://inventory-service:3000';
const ORDER_SERVICE = 'http://order-service:3001';
const PAYMENT_SERVICE = 'http://payment-service:3002';

async function callService(url, options = {}) {
  const res = await fetch(url, options);
  const text = await res.text();

  if (!res.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

function safeArray(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.inventory)) return data.inventory;
  return [];
}

// ORDERS 

// GET ALL
app.get('/orders', async (req, res) => {
  try {
    const data = await callService(`${ORDER_SERVICE}/orders`);
    res.json(safeArray(data));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ONE
app.get('/orders/:id', async (req, res) => {
  try {
    const data = await callService(`${ORDER_SERVICE}/orders/${req.params.id}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE
app.post('/orders', async (req, res) => {
  try {
    const body = {
      ...req.body,
      totalAmount: Number(req.body.totalAmount)
    };

    const data = await callService(`${ORDER_SERVICE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.patch('/orders/:id', async (req, res) => {
  try {
    const body = {
      ...req.body,
      totalAmount: Number(req.body.totalAmount)
    };

    const data = await callService(`${ORDER_SERVICE}/orders/${req.params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete('/orders/:id', async (req, res) => {
  try {
    await callService(`${ORDER_SERVICE}/orders/${req.params.id}`, {
      method: 'DELETE'
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PAYMENTS 

// GET ALL
app.get('/payments', async (req, res) => {
  try {
    const data = await callService(`${PAYMENT_SERVICE}/payments`);
    res.json(safeArray(data));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ONE
app.get('/payments/:id', async (req, res) => {
  try {
    const data = await callService(`${PAYMENT_SERVICE}/payments/${req.params.id}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE
app.post('/payments', async (req, res) => {
  try {
    const body = {
      orderId: req.body.orderId,
      amount: Number(req.body.amount),
      paymentDate: req.body.paymentDate,
      paymentMethod: req.body.paymentMethod,
      status: req.body.status
    };

    const data = await callService(`${PAYMENT_SERVICE}/payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.patch('/payments/:id', async (req, res) => {
  try {
    const data = await callService(`${PAYMENT_SERVICE}/payments/${req.params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete('/payments/:id', async (req, res) => {
  try {
    await callService(`${PAYMENT_SERVICE}/payments/${req.params.id}`, {
      method: 'DELETE'
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// INVENTORY

// GET ALL
app.get('/inventory', async (req, res) => {
  try {
    const data = await callService(`${INVENTORY_SERVICE}/books`);

    const list =
      data?.books ||
      data?.inventory ||
      data?.data ||
      data;

    if (!Array.isArray(list)) {
      return res.json([]);
    }

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ONE
app.get('/inventory/:id', async (req, res) => {
  try {
    const data = await callService(`${INVENTORY_SERVICE}/books/${req.params.id}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE
app.post('/inventory', async (req, res) => {
  try {
    const body = {
      title: req.body.title?.trim(),
      author: req.body.author?.trim(),
      stock: String(req.body.stock ?? req.body.quantity ?? 0),
      price: String(req.body.price ?? "0")
    };

    const data = await callService(`${INVENTORY_SERVICE}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.patch('/inventory/:id', async (req, res) => {
  try {
    const body = {
      ...req.body,
      quantity: Number(req.body.quantity),
      price: req.body.price
    };

    const data = await callService(`${INVENTORY_SERVICE}/books/${req.params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete('/inventory/:id', async (req, res) => {
  try {
    await callService(`${INVENTORY_SERVICE}/books/${req.params.id}`, {
      method: 'DELETE'
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// START 

app.listen(9001, () => {
  console.log('Gateway running on http://api-gateway:9001');
});