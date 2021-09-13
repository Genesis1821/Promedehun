import { useState, useEffect }from 'react';
import { apiGetCodigosItems } from '../../../api/api';
import { useForm } from '../../../helpers/useForm';
import './updatesArticulos.css';
import Modal from '../Modal';

const UpdateEstadoAcutal = ({closeModal}) => {

    const [articulos, setArticulos] = useState({ data: [], msg: '' });
    const [ values, handleInputChange, reset ] = useForm({codigoActual: '', newEstado: 'Activo'});

    const getCodigos = async() => {
        const { data } = await apiGetCodigosItems('updateCodigo');
        setArticulos({ data, msg: '' })
    }

    useEffect(() => {
        getCodigos()

        return () => {
            setArticulos({ data: [], msg: '' });
            reset();
        }
    }, [])

    const handleSubmit = async(e) => { 
        e.preventDefault();
        console.log(values)
    }

    return (
        <Modal closeModal={closeModal}>
             <form className='formUpdCodigo' onSubmit={handleSubmit}>

                <label className='labelUpdCodigo'>Seleccione código</label>
                <input 
                    type='text'
                    name='codigoActual'
                    placeholder='Código del artículo'
                    value={values.codigoActual}
                    onChange={handleInputChange}
                    list='my-list'
                    autoComplete='off'
                    className='inputUpdCodigo'
                />
                <datalist id='my-list'>
                  { articulos.data.map( item => (
                        <option key={item.codigo} value={`${item.codigo }  ${ item.descripcion}`} />               
                    )) 
                  } 
                </datalist> 

                <label className='labelUpdCodigo'>Estado actual</label>
                <select name='newEstado' className='inputUpdCodigo' value={values.newEstado} onChange={handleInputChange} >
                    <option value='Activo'>Activo</option>
                    <option value='Desincorporado'>Desincorporado</option>
                </select>

                { articulos.msg.length > 0 && <p id='msgOfProceso'>{articulos.msg}</p> }
                <button type='submit' className='btnUpdCodigo'>
                    Guardar Cambio
                </button>
                <button type='button' onClick={ () => closeModal(false) } className='btnUpdCodigo cerrar'>
                    Cerrar
                </button>
            </form>
        </Modal>
    )
}

export default UpdateEstadoAcutal
