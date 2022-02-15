const express = require('express');
const router = express.Router();
const Casa = require("../models/Casa");
const path = "/:conjuntoID/casa";

// Create document CASA
router.post(path, async (req, res) => {
    const casa = new Casa({
        nombre: req.body.nombre,
        ubicacion: req.body.ubicacion,
        area: req.body.area,
        fechaApertura: req.body.fechaApertura,
        precio: req.body.precio,
        // Conjunto
        conjuntoID: req.params.conjuntoID,
    });

    try {
        const promise = await casa.save();
        res.json(promise);
    } catch (e) {
        res.json({message: e});
    }
});

// Read all documents
router.get(path, async (req, res) => {
    try {
        const casas = await Casa.find({conjuntoID: req.params.conjuntoID});
        res.json(casas);
    } catch (e) {
        res.json({message: e});
    }
});

// Read document by ID
router.get(`${path}/:casaID`, async (req, res) => {
    try {
        const casa = await Casa.findById(req.params.casaID);
        res.json(casa);
    } catch (e) {
        res.json({message: e});
    }
});

// Update document by ID
router.patch(`${path}/:casaID`, async (req, res) => {
    try {
        const casa = await Casa.updateOne(
            { _id: req.params.casaID },
            { $set: {
                    nombre: req.body.nombre,
                    ubicacion: req.body.ubicacion,
                    area: req.body.area,
                    fechaApertura: req.body.fechaApertura,
                    precio: req.body.precio,
                    conjuntoID: req.body.conjuntoID,
                } }
        );
        res.json(casa);
    } catch (e) {
        res.json({message: e});
    }
});

// Delete document by ID
router.delete(`${path}/:casaID`, async (req, res) => {
    try {
        const casa = await Casa.remove(
            { _id: req.params.casaID }
        );
        res.json(casa);
    } catch (e) {
        res.json({message: e});
    }
});

module.exports = router;