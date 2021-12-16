const mongoose = require("mongoose");

// Schema
const ConjuntoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    area: {
        type: Number,
        required: true,
    },
    fechaApertura: {
        type: Date,
        default: Date.now,
    },
    estrellas: {
        type: Number,
        required: true,
    },
    // Sub-collection?
    // casas: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Casas",
    // }]
});

module.exports = mongoose.model("Conjuntos", ConjuntoSchema);