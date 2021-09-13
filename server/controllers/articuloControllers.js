const pool = require('../Database/dataBaseConfig');


const registroArticulo = async(req, res) => {
  try {
        const { 
            codigo, descripcion, marca, modelo, serial, estado_actual,
            condicion_ingreso,  fecha_ingreso, factura } = req.body

        const resp = await pool.query('SELECT estado_actual FROM articulo WHERE codigo = $1', [codigo.trim()]);

        if ( resp.rowCount > 0 ) {
            return res.json({ 
              respuesta: `Ese artículo ya está registado y actualmente se encuentra ${resp.rows[0].estado_actual}.`,
              error: true
            })
        } 

        await pool.query(`INSERT INTO articulo(codigo, descripcion, marca, modelo, serial, estado_actual, condicion_ingreso, fecha_ingreso, factura, asignado) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [ codigo.trim(), descripcion.trim(), marca.trim(), modelo.trim(), serial.trim(), estado_actual, condicion_ingreso, fecha_ingreso, factura.trim(), false]);
        
        res.json({ respuesta: 'El registro fue exitoso'})
  } catch (error) {
        console.log(error.message);
  }
}

const getCodigoArticulos = async(req, res) => {
  try {
    const { component } = req.params; // value => updateCodigo OR FormAsig.

    if ( component === 'updateCodigo' ){ // todos los articulos que puedan marcarse como desincorporado
        const resp = await pool.query(`SELECT codigo, descripcion FROM articulo WHERE estado_actual = $1 ORDER BY codigo`, ['Activo']); 
        res.json( resp.rows );
    } else { // items que estan disponibles para asignar.
        const resp = await pool.query(`SELECT codigo, descripcion FROM articulo WHERE estado_actual = $1 AND asignado = $2 ORDER BY codigo`, ['Activo', false]); // where estado === false, osea por asginar.
        res.json( resp.rows );
    }
   
  } catch (err) {
    console.log(err.message);
  }
}

const getArticulosByUser = async(req, res) => {
  try {
        const { cedula } = req.params;

        const resp = await pool.query(`SELECT 
            codigo,
            descripcion,
            marca,
            modelo,
            estado_actual,
            condicion_ingreso,
            fecha_ingreso,
            factura,
            responsable, 
            cedula,
            serial
            FROM usuario 
            INNER JOIN asignacion_articulos ON cedula_usuario = cedula
            INNER JOIN articulo ON codigo = codigo_articulo WHERE cedula = $1 AND estado_asignacion = $2`, [ cedula, true ]
        );  
        res.json( resp.rows );

    } catch (error) {
        console.log(error.message);
    }
}

const articulosSinRelaciones = async(req, res) => {
  try {
    
      const resp = await pool.query(`SELECT codigo, descripcion,estado_asignacion FROM articulo LEFT JOIN asignacion_articulos ON codigo_articulo = codigo`,);

      const noAsignados = resp.rows.filter( item => item.estado_asignacion === null );

      res.json(noAsignados);
  } catch (err) {
      console.log(err.message);
  }
}


const updateCodigoArticulo = async(req, res) => {
  try {
    const { codigoActual, newCodigo } = req.body;

    await pool.query(`UPDATE articulo set codigo = $1 WHERE codigo = $2`, [newCodigo, codigoActual.trim()]);

    res.json({ respuesta: 'Modificación realizada' });
  } catch (err) {
    console.log(err.message);
  }
}

const updateArticulo = async(req, res) => {
  try {
    const { codigo,	descripcion, marca, modelo, serial,
      condicion_ingreso, fecha_ingreso, factura } = req.body;

      await pool.query(`UPDATE articulo SET descripcion = $1, marca = $2, modelo = $3, serial = $4, condicion_ingreso = $5, fecha_ingreso = $6, factura = $7 WHERE codigo = $8`, [ descripcion.trim(), marca.trim(), modelo.trim(), serial.trim(), condicion_ingreso.trim(), fecha_ingreso, factura.trim(), codigo.trim() ]);

      res.json({ respuesta: 'Modificaciones realizadas exitosamente' });
  } catch (err) {
      console.log(err.message);
  }
}


const changeEstadoArticulo = async(req, res) => {
  try {
      const { estado_actual, codigo } = req.body;
      let fechaActual = new Date().toLocaleDateString();
      await pool.query(`UPDATE articulo SET estado_actual = $1, asignado = $2 WHERE codigo = $3`, [ estado_actual, false, codigo.trim() ]);

      await pool.query(`UPDATE asignacion_articulos SET estado_asignacion = $1, fecha_desasignacion = $2 WHERE codigo_articulo = $3 AND estado_asignacion = $4`, [false, fechaActual, codigo.trim(), true]);

      res.json({ respuesta: 'Los cambios han sido guardados exitosamente.' });
  } catch (err) {
      console.log(err.message);
  }
}


const allArticulos = async(req, res) => {

  const querySelect = `SELECT codigo, descripcion, marca, modelo, estado_actual, condicion_ingreso, fecha_ingreso, factura,   responsable, cedula, serial, estado_asignacion, asignado`;

  try { // juntar los articulos que tengan responsable y los que no. Enviar esa data.

      const itemsWithResponsable = await pool.query(`${querySelect} FROM articulo 
      LEFT JOIN asignacion_articulos ON codigo_articulo = codigo 
      LEFT JOIN usuario ON cedula = cedula_usuario WHERE estado_asignacion = $1
      ORDER BY responsable`, [true]);

      const itemsNoAsignados = await pool.query(`SELECT * FROM articulo WHERE asignado = $1 ORDER BY estado_actual`, [false]);
    
      const sendData = [ ...itemsWithResponsable.rows, ...itemsNoAsignados.rows ];
   
      res.json(sendData);
  } catch (err) {
    console.log(err.message)
  }
}



module.exports = {
    registroArticulo,
    getArticulosByUser,
    getCodigoArticulos,
    allArticulos,
    articulosSinRelaciones,
    updateCodigoArticulo,
    updateArticulo,
    changeEstadoArticulo
}