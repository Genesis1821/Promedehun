import './FormProduct.css';
import { useState } from 'react';
import { apiRegistrarItem } from '../../api/api';
import { checkCampos } from '../../helpers/checkSetsForm';
import { useForm } from '../../helpers/useForm';



const FormProduct = () => {
    const [ values, handleInputChange, reset ] = useForm({ 
        codigo: '', descripcion: '', marca: '', modelo: '', 
        serial: '', estado_actual: '', condicion_ingreso: '', 
        fecha_ingreso: '', factura : ''
    });

    const [msgRegistro, setMsgRegistro] = useState({ state: false, msg: '' });
 
    const handleSubmit = async(e) => {
        e.preventDefault();
        const { marca, modelo, serial, ...res } = values;
        let resp = checkCampos(res);

        if( resp === 'exito' ){
            const { data } = await apiRegistrarItem(values);
            !data.error && reset();
            setMsgRegistro({ state: true, msg: data.respuesta })
        }else { setMsgRegistro({ state: true, msg: 'Error: Uno o más campos sin seleccionar.' }) }

        setTimeout(() => {
            setMsgRegistro({ state: false, msg: '' });
        }, 2400);
   
    }

    return (
        <div className="contentViewRegister">
            <div className='registerContentTitle'>
                { msgRegistro.state && <p>{ msgRegistro.msg }</p> }
                <h2>Registro de Inventario</h2>
            </div>
            <form className='formRegistro' onSubmit={ handleSubmit }>
                
                    <input type='text' placeholder='Código del artículo' name='codigo'  value={ values.codigo } onChange={ handleInputChange } />
                
                    <input type='text' placeholder='Descripción del artículo'  name='descripcion' value={values.descripcion} onChange={handleInputChange}/>

                    <input type='text' placeholder='Marca del artículo (opcional)*' name='marca' value={values.marca}onChange={handleInputChange}/>
                
                    <input type='text' placeholder='Modelo del artículo (opcional)*' name='modelo' value={values.modelo}onChange={handleInputChange} />
                
                    <input type='text' placeholder='Serial del artículo (opcional)*' name='serial' value={values.serial} onChange={handleInputChange}/>
                
                <div>
                    <select name='condicion_ingreso' value={values.condicion_ingreso} onChange={handleInputChange}>
                        <option value="default">Condición de ingreso</option>
                        <option value='Patrimonial/Comprado'>Patrimonial/Comprado</option>
                        <option value='Patrimonial/Prestado'>Patrimonial/Prestado</option>
                        <option value='Prestamo/Arrendadores'>Prestamo/Arrendadores</option>
                    </select>
                </div>
                    <label htmlFor="fecha" className="fecha" >Fecha de ingreso</label>
                    <input  type='date' id="fecha" name='fecha_ingreso' value={values.fecha_ingreso} onChange={handleInputChange}/>

                    <select name='estado_actual' value={values.estado_actual} onChange={handleInputChange}>
                        <option value="default">Estado Actual</option>
                        <option value='Activo'>Activo</option>
                        <option value='Desincorporado'>Desincorporado</option>
                    </select>

                    <input type='text' placeholder='Factura del artículo' name='factura' value={values.factura} onChange={handleInputChange}/>
                    
                    <button type='submit' className="botonEnviar">Guardar Registro</button>
                </form>
         </div>
       
    )
}

export default FormProduct
