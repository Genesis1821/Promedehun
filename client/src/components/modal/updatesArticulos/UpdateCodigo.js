import { useState, useEffect } from 'react';
import Modal from "../Modal";
import './updatesArticulos.css';
import { apiItemSinRelaciones, apiUpdateCodigoItem } from '../../../api/api';
import { useForm } from '../../../helpers/useForm';




const UpdateCodigo = ({closeModal}) => {
    const [articulos, setArticulos] = useState({ data: [], msg: '' });
    const [ values, handleInputChange, reset ] = useForm({codigoActual: '', newCodigo: ''})


    const getArticulosSinAsignacion = async() => {
        const { data } = await apiItemSinRelaciones();
        setArticulos({ data, msg: ''});
    }

    useEffect(() => {
        getArticulosSinAsignacion();

        return () => {
            setArticulos({ data: [], msg: '' });
            reset();
        }
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault();
        let error = 0;

       if( values.newCodigo.length > 6 ){    
            let submitData = { codigoActual: values.codigoActual.trim().split(' ')[0], newCodigo: values.newCodigo.trim() };
            const { data:{ respuesta } } = await apiUpdateCodigoItem(submitData);
            setArticulos({ ...articulos, msg: respuesta });
            error = 0;
        } else {
            setArticulos({ ...articulos, msg: 'El código es muy corto, vuelve a intentarlo'});
            error++
       }   
       
        setTimeout(() => {
            if( error > 0 ){
                setArticulos({ ...articulos, msg: ''});
            }else {
                getArticulosSinAsignacion();
                reset()
            }
        }, 2500);
    }

    return (
        <Modal closeModal={closeModal}>
            <form className='formUpdCodigo' onSubmit={handleSubmit}>
                <p><b>Nota:</b> Solos los artículos que no estén asignados, puede ser actualizado su código.</p>

                <label className='labelUpdCodigo'>Seleccione código</label>
                <input 
                    type='text'
                    name='codigoActual'
                    placeholder='Código a actualizar'
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

                <label className='labelUpdCodigo'>Nuevo código</label>
                <input 
                    type='text'
                    name='newCodigo'
                    placeholder='Escribe el nuevo código'
                    value={values.newCodigo}
                    onChange={handleInputChange}
                    autoComplete='off'
                    className='inputUpdCodigo'
                />

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

export default UpdateCodigo;
