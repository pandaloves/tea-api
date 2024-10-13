const express = require("express");
const app = express();
app.use(express.json());

app.use(express.static("public"));
app.use("/api/product", require("./routes/product_routes.js"));
app.use("/api/category", require("./routes/category_routes.js"));
module.exports = app;
