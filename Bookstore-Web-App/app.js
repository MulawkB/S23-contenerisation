const express = require("express");
const path = require("path");

const orderRoutes = require("./routes/orders.routes");
const paymentRoutes = require("./routes/payments.routes");
const inventoryRoutes = require("./routes/inventory.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
  res.render("layout");
});

app.use("/orders", orderRoutes);
app.use("/payments", paymentRoutes);
app.use("/inventory", inventoryRoutes);

const PORT = 8082;

app.listen(PORT, () => {
  console.log(`Bookstore Web App running on http://localhost:${PORT}`);
});