const express = require('express');
const router = express.Router();
const Conjunto = require("../models/Conjunto");

// Create document CONJUNTO
router.post("/", async (req, res) => {
    const conjunto = new Conjunto({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        area: req.body.area,
        fechaApertura: req.body.fechaApertura,
        estrellas: req.body.estrellas,
    });

    // Save to DB
    try {
        const promise = await conjunto.save();
        res.json(promise);
    } catch (e) {
        res.json({message: e});
    }
});

// Read all documents
router.get("/", async (req, res) => {
    try {
        const conjuntos = await Conjunto.find();
        res.json(conjuntos);
    } catch (e) {
        res.json({message: e});
    }
});

// Read document by ID
router.get("/:conjuntoID", async (req, res) => {
    try {
        const conjunto = await Conjunto.findById(req.params.conjuntoID);
        res.json(conjunto);
    } catch (e) {
        res.json({message: e});
    }
});

// Update document by ID
router.patch("/:conjuntoID", async (req, res) => {
    try {
        const conjunto = await Conjunto.updateOne(
            { _id: req.params.conjuntoID },
            { $set: {
                    nombre: req.body.nombre,
                    direccion: req.body.direccion,
                    area: req.body.area,
                    fechaApertura: req.body.fechaApertura,
                    estrellas: req.body.estrellas,
                }}
        );
        res.json(conjunto);
    } catch (e) {
        res.json({message: e});
    }
});

// Delete document by ID
router.delete("/:conjuntoID", async (req, res) => {
    try {
        const conjunto = await Conjunto.remove(
            { _id: req.params.conjuntoID }
        );
        res.json(conjunto);
    } catch (e) {
        res.json({message: e});
    }
});

module.exports = router;