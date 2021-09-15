import { useState } from 'react'
import { registrar } from '../../helpers/registros';
import { useForm } from '../../helpers/useForm'
import './FormUsers.css';

const FormUsers = () => {
        const [msgRegistro, setMsgRegistro] = useState({ state: false, msg: '' });
        const [ values, handleInputChange, reset ] = useForm({ responsable: '', cedula: '' })

        const handleSubmit = (e) => {
            e.preventDefault();

            let cedula = values.cedula.trim();

            if( values.responsable.length < 9 || cedula.length < 7 || cedula.length > 8 ) {
                setMsgRegistro({ state: true, msg: 'El dato es muy corto o la cédula es incorrecta, vuelve a intentarlo.' })
            }else{
                registrar( 'FormUsers', values, setMsgRegistro, reset );
            }

            setTimeout(() => {
                setMsgRegistro({ state: false, msg: '' });
            }, 2600);
        }

        

    return (
        <div className="Personal">

            

            <form className="formPersonal" onSubmit={ handleSubmit }>
                { msgRegistro.state && <p className='aviso'>{ msgRegistro.msg }</p> }
                <h2>Personal</h2>
                <input 
                    type='text' 
                    placeholder='Nombre del responsable' 
                    name='responsable' 
                    value={ values.responsable } 
                    onChange={ handleInputChange }
                />

                <input 
                    type='text' 
                    placeholder='Cédula' 
                    name='cedula'
                    value={ values.cedula }
                    onChange={ handleInputChange }
                />
                <button type='submit' className='botonEnviar'>
                    Guardar Registro
                </button>
            </form>  
        </div>
    )
}

export default FormUsers
