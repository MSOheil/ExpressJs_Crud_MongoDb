const express = require('express');
const mongoose = require("mongoose");
const Product = require('./Src/Models/ProductModel');
const app = express();
app.use(express.json());

app.get("/products", async (req, res) => {
    try {
        const proudcts = await Product.find({});
        res.status(200).json(proudcts);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});
//Update a products
app.put("/updateproduct/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ Message: `Product dind't update with id ${id}` });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
// Delete a product
app.delete("/deleteprodct/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ Message: `can not find product ${id}` });
        }
        return res.status(200).json(product);
    } catch (errr) {
        res.status(500).send(err.message);
    }
});
app.get("/getbyid/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        res.status(200).send(product);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get("/", (req, res) => {
    console.log("hello world");
    res.send("Hello world node api");
})
app.get("/blog", (req, res) => {
    res.send("Hello from blog");
})
app.post("/createProduct", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
})
mongoose.connect('mongodb://localhost:27017')
    .then(app.listen(3000, () => console.log("the application listening on port 3000"))).then(() => console.log("mongo db contencted"))
    .catch((err) => console.log(err));