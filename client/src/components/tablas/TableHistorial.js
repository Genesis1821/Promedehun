import { useEffect, useState } from 'react'
import { apiHistorialAsignaciones, apiHistorialByArticulo } from '../../api/api';
import { useForm } from '../../helpers/useForm';



const ModelTableHistorial = () => {
    const [dataHistorial, setDataHistorial] = useState([]);
    const [ values, handleInputChange, reset ] = useForm({codigo: ''});

    const allItemsHistory = async() => {
        const { data } = await apiHistorialAsignaciones();
        setDataHistorial(data);
        console.log(data)
    }

    useEffect(() => {
        allItemsHistory();
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault();

        const { data } = await apiHistorialByArticulo(values.codigo);
        setDataHistorial(data);
        console.log(data)
        reset();
    }
    return (
        <div>
            <div>
                <button onClick={ allItemsHistory }>Ver todos</button>
                <form onSubmit={ handleSubmit }>
                    <label>Historial por artículo</label>
                    <input 
                        type='text'
                        placeholder='Ingrese el código del artículo'
                        name='codigo'
                        value={values.codigo}
                        onChange={handleInputChange}
                    />
                    <button type='submit'>Buscar</button>
                </form> 
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Fecha Asignación</th>
                        <th>Fecha Desasignación</th>            
                        <th>Cédula</th>
                        <th>Responsable</th>
                        <th>Condición de Ingreso</th>        
                    </tr>
               </thead>
                <tbody>
                    {
                        dataHistorial.map( item => (
                            <tr key={ item.id} >
                                <td><b>{ item.codigo_articulo }</b></td>
                                <td>{ item.descripcion }</td>
                                <td>{ item.fecha_asignacion }</td>
                                <td>{ item.fecha_desasignacion ? item.fecha_desasignacion : <b>Estado: Asignado </b>}</td>
                                <td>{ item.cedula_usuario }</td>
                                <td>{ item.responsable}</td>
                                <td>{ item.condicion_ingreso}</td>
                            </tr>
                        ))
                    }                
                </tbody>           
            </table>  
        </div>
    )
}

export default ModelTableHistorial;
