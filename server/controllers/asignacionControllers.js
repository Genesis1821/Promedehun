const pool = require('../Database/dataBaseConfig');



const asignacionArticulo = async(req, res) => {
    try {
        const { codigo_articulo, cedula_usuario, fecha_asignacion } = req.body;
        let estado_asignacion = true;
        let codigo = codigo_articulo.trim().split(' ')[0];
      
        await pool.query('UPDATE articulo SET asignado = $1 WHERE codigo = $2', [estado_asignacion, codigo ]);

        await pool.query(`INSERT INTO asignacion_articulos(codigo_articulo, cedula_usuario, fecha_asignacion, estado_asignacion) 
            values($1, $2, $3, $4)`, [codigo, cedula_usuario.trim(), fecha_asignacion, estado_asignacion]);

        res.json({ respuesta: 'Asignación realizada exitosamente', error: false});
    
    } catch (error) {
        console.log(error.message);
        res.json({ respuesta: 'Error: El responsable debe estar registrado antes de asginarle algún artículo.', error: true});
    }
}

const getAsignacionesActivas = async(req, res) => {
    try {
      
        const resp = await pool.query(`SELECT id,codigo_articulo, descripcion, cedula_usuario FROM asignacion_articulos INNER JOIN articulo ON codigo = codigo_articulo WHERE estado_asignacion = $1`, [ true ]);
      
        res.json(resp.rows);
    } catch (err) {
        console.log(err.message);
    }
}

const desasignarArticulo = async(req, res) => {
    try {
        let estadoAsignacion = false;
        const { id, fecha_desasignacion, codigo, estado_actual } = req.body;

        await pool.query(`UPDATE asignacion_articulos SET fecha_desasignacion = $1, estado_asignacion = $2 WHERE id = $3`, [ fecha_desasignacion, estadoAsignacion, id ]);

        await pool.query(`UPDATE articulo SET estado_actual = $1, asignado = $2 WHERE codigo = $3`, [ estado_actual, estadoAsignacion, codigo ]);

        res.json({ respuesta: 'Artículo desasignado exitosamente.'});

    } catch (err) {
        console.log(err.message);
    }
}


const historialAsignaciones = async(req, res)=> {
    try {
        const resp = await pool.query(`SELECT id, codigo_articulo, descripcion, fecha_asignacion, fecha_desasignacion, cedula_usuario, responsable, condicion_ingreso FROM articulo INNER JOIN asignacion_articulos ON codigo_articulo = codigo INNER JOIN usuario ON cedula = cedula_usuario ORDER BY codigo_articulo`);

        res.json(resp.rows)
    } catch (err) {
        console.log(err.message);
    }
    
} 

const historialByArticulo = async(req, res)=> {
    try {
        const { codigo } = req.params;

        const resp = await pool.query(`SELECT id, fecha_asignacion, fecha_desasignacion, codigo_articulo, cedula_usuario, descripcion, condicion_ingreso, responsable FROM articulo INNER JOIN asignacion_articulos ON codigo_articulo = codigo INNER JOIN usuario ON cedula = cedula_usuario WHERE codigo_articulo = $1`, [ codigo.trim() ]);
    
        res.json(resp.rows)
    } catch (err) {
        console.log(err.message);
    }
} 


module.exports = {
    asignacionArticulo,
    getAsignacionesActivas,
    desasignarArticulo,
    historialAsignaciones,
    historialByArticulo
}