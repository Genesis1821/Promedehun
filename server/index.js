const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

//routes imports
const routesArticulos = require('./routes/articulo');
const routesUsuarios = require('./routes/usuario');
const routesAsignacionArticulos = require('./routes/asignacionArticulos');
const routesGenerarPdf = require('./routes/pdf');

//midelwares, funciones.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.set("views", path.join(__dirname, "/static"));
app.set('view engine', 'pug');

//routes
app.use('/api', routesArticulos);
app.use('/api', routesUsuarios);
app.use('/api', routesAsignacionArticulos);
app.use('/api', routesGenerarPdf);


app.listen('4000', () => console.log('server encendido'));
