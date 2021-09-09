import { useEffect, useState } from "react";
import './UpdateUsuario.css';
import { apiUpdateUser, apiUsuariosNoRelacionados } from "../../api/api";
import { useForm } from "../../helpers/useForm";
import Modal from "./Modal";



const UpdateUsuario = ({ closeModal }) => {
    const [ dataUsers, setDataUsers ] = useState({ data: [], response: '' });
    const [ values, handleInputChange, reset ] = useForm({ cedulaActual: '', newCedula: '',responsable: '' });

    const usersWithOutAsignaciones = async() => {
        const { data } = await apiUsuariosNoRelacionados();
        setDataUsers({ data, response: '' });
    }

    useEffect(() => {
        usersWithOutAsignaciones();

        return () => {
            setDataUsers({ data: [], response: '' });
            reset();
        }
    }, [])


    const handleSubmit = async(e) => {
        e.preventDefault();

        let cedulaActual = parseInt(values.cedulaActual);
        const submitValues = { newCedula: values.newCedula.trim().length > 6 ? values.newCedula.trim() : cedulaActual.toString(), responsable: values.responsable.trim(), cedulaActual: cedulaActual.toString() }

        const { data:{ respuesta } } = await apiUpdateUser(submitValues);
        reset();
        setDataUsers({...dataUsers, response: respuesta });
    
        setTimeout(() => {
            usersWithOutAsignaciones();
        }, 2000);
   
    }

    return (
        <Modal closeModal={closeModal}>

            <form className='formUpdateUsuario' onSubmit={ handleSubmit }>
                <p className='notaUsuario'><b>Nota:</b> Solos los usuarios que no tengan artículos asignados pueden ser actualizados.</p>

                <label className='labelUpdateUser'>Seleccione Usuario</label>
                <input 
                    type='text' 
                    placeholder='Cédula del usuario' 
                    list='my-list'
                    name='cedulaActual'
                    value={ values.cedulaActual }
                    onChange={ handleInputChange }
                    className='inputUpdateUser'
                    autoComplete='off'
                />
                <datalist id='my-list'>
                  { 
                    dataUsers.data.map( user => (
                        <option key={user.cedula} value={`${user.cedula}  ${user.responsable}`} />               
                    )) 
                  }   
                </datalist>  

                <label className='labelUpdateUser'>Cambiar cédula</label>
                <input 
                    type='text' 
                    placeholder='¿Cambiar cédula? (opcional)' 
                    name='newCedula'
                    value={ values.newCedula}
                    onChange={ handleInputChange }
                    className='inputUpdateUser'
                /> 

                <label className='labelUpdateUser'>Nuevo nombre</label>
                <input 
                    type='text' 
                    placeholder='Nombre del Responsable' 
                    name='responsable'
                    value={ values.responsable }
                    onChange={ handleInputChange }
                    className='inputUpdateUser'
                    autoComplete='off'
                /> 
                {  dataUsers.response.length > 0 && <p>{ dataUsers.response }</p>  }
                <button className='buttonsUpdateUser' type='submit'>
                    Guardar Cambios
                </button>
                
                <button type='button' className='buttonsUpdateUser cerrar' onClick={ () => closeModal(false) }>
                    Cerrar
                </button>
                
            </form>
        </Modal>
    )
}

export default UpdateUsuario;
