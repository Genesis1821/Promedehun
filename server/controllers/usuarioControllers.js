const pool = require('../Database/dataBaseConfig');


const registarUsuario = async(req, res) => {
    try {
        let estado = true;
        const { cedula, responsable } = req.body;
        const validateUser = await pool.query('SELECT * FROM usuario WHERE cedula = $1', [ cedula.trim() ]);

        if ( validateUser.rowCount > 0 ) res.json({ respuesta: 'Error: Ya existe un usuario registrado con esos datos.', error: true});
        else {
            await pool.query(`INSERT INTO usuario( cedula, responsable, estado) 
            VALUES( $1, $2, $3 )`, [ cedula.trim(), responsable.trim(), estado ]);        
            res.json({ respuesta: 'El registro fue exitoso', error: false});
        }
      
    } catch (error) {
        console.log(error.message);
    }
}

const usersNoAsignados = async(req, res) => {
    try {
       const resp = await pool.query(`SELECT cedula, responsable, estado_asignacion FROM usuario LEFT JOIN asignacion_articulos ON cedula_usuario = cedula WHERE estado = $1`, [true]);

       const noAsignados = resp.rows.filter( user => user.estado_asignacion === null );
    
       res.json(noAsignados);
    } catch (err) {
        console.log(err.message);
    }
}

const updateUserNoAsignado = async(req, res) => {
    try {
        const { cedula, responsable } = req.body;
        await pool.query(`UPDATE usuario SET cedula = $1, responsable = $2 WHERE cedula = $3`, [ cedula, responsable, cedula ]);

        res.json({ respuesta: 'Los cambios han sido guardados' });
    } catch (err) {
        console.log(err.message);
    }
}

const usuarioRetirado = async(req, res) => {
    try {
        const { cedula } = req.body;
        await pool.query(`UPDATE usuario SET estado = $1 WHERE cedula = $2`, [ false, cedula ]);
        
        res.json({ respuesta: 'La acción ha sido realizada exitosamente.' })
    } catch (error) {
        console.log(error.message);
    }
}

const getUsuarioRetirados = async(req, res) => {
    try {
        const resp = await pool.query('SELECT * FROM usuario WHERE estado = $1', [false]);
        res.json(resp.rows);
    } catch (err) {
        console.log(err.message);
    }
}



module.exports = {
    registarUsuario,
    usersNoAsignados,
    updateUserNoAsignado,
    usuarioRetirado,
    usuarioRetirado,
    getUsuarioRetirados,
}