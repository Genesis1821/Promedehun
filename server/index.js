const express = require('express');
const cors = require('cors');
const app = express();

//routes imports
const routesArticulos = require('./routes/articulo');
const routesUsuarios = require('./routes/usuario');
const routesAsignacionArticulos = require('./routes/asignacionArticulos');

//midelwares, funciones.
app.use(express.json());
app.use(express.urlencoded({extended: false}) );
app.use(cors());


//routes
app.use('/api', routesArticulos);
app.use('/api', routesUsuarios);
app.use('/api', routesAsignacionArticulos);


app.listen('4000', () => console.log('server encendido'));
