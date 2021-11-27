import React, { useState } from 'react';
import { loginAction } from '../../acciones/actionUser';
import { useForm } from '../../helpers/useForm';
import './login.css';

const Login = ({ setAcceso }) => {
    const [values, handleInputChange, reset] = useForm({ nombre: '', clave: '' });

    const [msgError, setMsgError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        msgError && setMsgError('')
        if (values.clave.trim().length < 6) return setMsgError('La contraseña debe ser mayor o igual a 6 caracteres.');

        const resp = await loginAction(values, setLoading, setMsgError, reset);
        resp && setAcceso(true);
    }

    return (
        <>
            <form className='formLogin' onSubmit={handleSubmit} >
                <p>Inicio de Sesión</p>
                <div className="formGroup">
                    <label htmlFor="nombre">Nombre de acceso</label>
                    <input type="text" id="nombre" placeholder="Escriba su nombre" onChange={handleInputChange} name='nombre' value={values.nombre} />
                </div>
                <div className="formGroup">
                    <label htmlFor="clave">Contraseña</label>
                    <input type="password" id='clave' placeholder='Contraseña' autoComplete='off' name='clave' value={values.clave} onChange={handleInputChange} />
                </div>

                <button type='submit'>Iniciar sesi&oacute;n</button>
            </form>
            <p style={{ paddingTop: '4px', color: msgError ? '#f00' : '#000' }} >
                {
                    loading ? 'Comprobando datos...' : msgError ? msgError : ''
                }
            </p>
        </>
    )
}

export default Login
