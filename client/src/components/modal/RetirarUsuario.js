import { useEffect, useState } from 'react'
import Modal from './Modal';
import './UpdateUsuario.css';
import { apiGetUsers, apiRetirarUser } from '../../api/api';
import { useForm } from '../../helpers/useForm';


const RetirarUsuario = ({closeModal}) => {;

    const [ dataUsers, setDataUsers ] = useState({ data: [], response: '' });
    const [ values, handleInputChange, reset ] = useForm({ cedula: '' })

    const getUsers = async() => {
        const { data } = await apiGetUsers();
        setDataUsers({ data, response: '' })
    }

    useEffect(() => {
        getUsers();

        return () => {
           setDataUsers({ data: [], response: '' });
           reset();
        }
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault();

        if( values.cedula.length > 6 ){
                
            const sendValue = { cedula: parseInt(values.cedula) };
            const { data: { respuesta } } = await apiRetirarUser(sendValue);
            reset();
            setDataUsers({ ...dataUsers, response: respuesta });

            setTimeout(() => {
                getUsers()
            }, 2000);
        }
    }

    return (
        <Modal closeModal={closeModal}>
             <form className='formUpdateUsuario' onSubmit={ handleSubmit }>

                <label className='labelUpdateUser'>Seleccione Usuario</label>
                <input 
                    type='text' 
                    placeholder='Cédula del usuario' 
                    list='my-list'
                    name='cedula'
                    value={ values.cedula }
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

                {  dataUsers.response.length > 0 && <p>{ dataUsers.response }</p>  }
                <button className='buttonsUpdateUser' type='submit'>
                    Desincorporar Usuario
                </button>
                
                <button type='button' className='buttonsUpdateUser cerrar' onClick={ () => closeModal(false) }>
                    Cerrar
                </button>
                
            </form>
        </Modal>
    )
}

export default RetirarUsuario;
