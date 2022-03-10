const express = require('express');
const app = express();
const cors = require('cors');
const { mongoose } = require('./database');

// Settings
app.set('port', 8080);

// Middlewares
app.use(express.json());    // Parse JSON
app.use(cors({origin: 'http://localhost:4200'}));

/* Routes */
// Conjunto
const conjuntoRoute = require('./routes/conjunto.routes');
app.use('/conjunto', conjuntoRoute);
// Casa
const casaRoute = require('./routes/casa.routes');
app.use('/conjunto', casaRoute);


// Start the server
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});