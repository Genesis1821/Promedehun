import { useEffect, useState } from "react";
import Modal from "./Modal";
import './desasignarModal.css';
import { useForm } from "../../helpers/useForm";
import { apiDesasignarArticulo, apiGetAsignacionesActivas } from "../../api/api";


const Desasignacion = ({closeModal}) => {
    const [ dataArticulo, setDataArticulo ] = useState({data: [], response: ''});
    const [ values, handleInputChange, reset ] = useForm({ codigo: '', fecha_desasignacion: new Date().toLocaleDateString(), estado_actual: 'Activo' });

    const getCodigosActivos = async() => {
        const { data } = await apiGetAsignacionesActivas();
        setDataArticulo({data, response: ''})
    }

    useEffect(() => {
        getCodigosActivos()

        return () => {
            setDataArticulo({data: [], response: ''});
            reset();
        }
    }, [])

    const findDataItem = (llamada) => {
        const data = dataArticulo.data.find( item => item.codigo_articulo === values.codigo.trim().split(' ')[0] );

        if( llamada === 'funcSubmit' ) return { id: !data ? '' : data.id, codigo: !data ? '' : data.codigo_articulo };
        if( llamada === 'valueInput' ) return { cedulaUser: !data ? '0 resultados' : data.cedula_usuario };
    }

    const handleSubmit = async(e) => {
        e.preventDefault();  
        const resp = findDataItem('funcSubmit');
        let errors = 0;

        if( resp.id === '' ){
            setDataArticulo({...dataArticulo, response: 'Error: Has intentado desasignar un artículo que no se encuentra registrado.'})
            errors++

        }else {
            const sendObject = { 
                id: resp.id,
                fecha_desasignacion: values.fecha_desasignacion, 
                codigo: resp.codigo,
                estado_actual: values.estado_actual
            }
            errors = 0;

            const { data } = await apiDesasignarArticulo(sendObject);   
            setDataArticulo({...dataArticulo, response: data.respuesta});
            
            setTimeout(() => {
                reset()  
            }, 1300);         
        }

        setTimeout(() => {   
            errors === 0 ? getCodigosActivos() : setDataArticulo({...dataArticulo, response: ''});
        }, 2800);
    }
       
    let findCedulaUser = values.codigo.length > 8 && findDataItem('valueInput');


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
                autoComplete='off'
                list='my-list' 
            />
             <datalist id='my-list'>
                  { dataArticulo.data.map( item => (
                        <option key={item.id} value={`${item.codigo_articulo }  ${ item.descripcion}`} />               
                    )) 
                  }
                 
            </datalist>  

            {
                values.codigo.length > 8
                &&  <>
                        <label className='desasignarModalTitle'>Cédula del responsable</label>
                            <input 
                            type="text" 
                            name='cedula_usuario'
                            value={ findCedulaUser.cedulaUser }
                            className='desasignarModalInput'
                            autoComplete='off'
                            onChange={handleInputChange} 
                            disabled={true}
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

                    <label className="desasignarModalTitle">Estado actual del artículo</label>
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
