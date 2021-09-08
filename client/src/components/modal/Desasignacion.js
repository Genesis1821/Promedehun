import { useState } from "react";
import Modal from "./Modal";
import './desasignarModal.css';
import { useForm } from "../../helpers/useForm";
import { apiDesasignarArticulo, apiGetAnAsignacion } from "../../api/api";


const Desasignacion = ({closeModal}) => {
    const [ dataArticulo, setDataArticulo ] = useState({data: [], response: ''});
    const [ values, handleInputChange, reset ] = useForm({ codigo: '', fecha_desasignacion: new Date().toLocaleDateString(), estado_actual: 'Activo' });

    const handleSubmit = async(e) => {
        e.preventDefault();
      
        if( dataArticulo.data.length === 0 ) {
            const { data } = await apiGetAnAsignacion(values.codigo);
            if(data.length === 0 ) {
                setDataArticulo({data: [], response: 'No se han encontrado respuestas, o el artículo ya fue desasignado.'});
                setTimeout(() => {
                    setDataArticulo({data: [], response: ''});
                }, 2600);
            }else{
                setDataArticulo({...dataArticulo, data});
            }
        }else {
            const sendObject = { 
                id: dataArticulo.data[0].id ,
                fecha_desasignacion: values.fecha_desasignacion, 
                codigo: values.codigo,
                estado_actual: values.estado_actual
            }
            const { data } = await apiDesasignarArticulo(sendObject);
            setDataArticulo({...dataArticulo, response: data.respuesta});

            setTimeout(() => {
                setDataArticulo({data: [], response: ''});
                reset()
            }, 2400);
        }
       
    }

    return (
        <Modal closeModal={closeModal}>
            <form className="desasignarModal" onSubmit={ handleSubmit }>
            <h3 className='modalDesTitulo'>Desasignar Artículo</h3>

            <label className='desasignarModalTitle'>Código del artículo a desasignar</label>
            <input 
                type='text' 
                name='codigo'
                value={ values.codigo }
                placeholder='Código del artículo' 
                className='desasignarModalInput'
                onChange={handleInputChange} 
            />
            <button type='submit' className='buttonModalDesag'>Buscar</button>   

            {
                dataArticulo.data.length !== 0
                &&  <>
                        <label className='desasignarModalTitle'>Cédula del responsable</label>
                            <input 
                            type="text" 
                            name='cedula_usuario'
                            value={ dataArticulo.data[0].cedula_usuario }
                            disabled= 'true' 
                            className='desasignarModalInput'

                        /> 

                        <label htmlFor="fechadesAsignacion" className="desasignarModalTitle">Fecha de Desasignacion </label>
                        <input 
                            type="date" 
                            id="fechadesAsignacion"
                            name='fecha_desasignacion' 
                            className='desasignarModalInput'
                            value={ values.fecha_desasignacion }
                            onChange={handleInputChange} 
                        />

                    <label className="desasignarModalTitle">Estado actual</label>
                    <select name='estado_actual' value={values.estado_actual} onChange={handleInputChange} className='selectModalDes'>
                        <option value='Activo'>Activo</option>
                        <option value='Desincorporado'>Desincorporado</option>
                    </select>

                        <button type='submit' className='buttonModalDesag'>
                        Guardar Cambios
                        </button>
                        
                    </>
            }
            <p>{ dataArticulo.response }</p>
           <button type='button' className='buttonModalDesagCancel' onClick={ () => closeModal(false) } >
               Cerrar
           </button>
          
       </form>
        </Modal>
    )
}

export default Desasignacion;
