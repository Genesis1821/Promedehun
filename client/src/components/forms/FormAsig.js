import './FormAsig.css';
import { useEffect, useState } from 'react';
import { useForm } from '../../helpers/useForm'
import { registrar } from '../../helpers/registros';
import { apiGetCodigosItems } from '../../api/api';


const FormAsig = () => {
    const [ codigoData, setCodigoData] = useState([]);
    const [msgRegistro, setMsgRegistro] = useState({ state: false, msg: '' });
    const [ values, handleInputChange, reset ] = useForm({codigo_articulo: '',cedula_usuario: '', fecha_asignacion: new Date().toLocaleDateString() });

    const { codigo_articulo, cedula_usuario, fecha_asignacion } = values;

    useEffect(() => {
        const codigosArticulos = async() => {
            const { data } = await apiGetCodigosItems();
            setCodigoData(data);
        }
        codigosArticulos()

        return () => {
            setCodigoData([]);
            reset();
            setMsgRegistro({ state: false, msg: '' });
        }
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault();
        let cedula = cedula_usuario.trim();

        if( codigo_articulo.length < 4 || cedula.length < 7 || cedula.length > 8 ){
            setMsgRegistro({ state: true, msg: 'El dato es muy corto o la cédula es incorrecta, vuelve a intentarlo.' })
        }else {
            const deleteCodigoState =  codigoData.filter( cod => cod.codigo !== codigo_articulo );
            let response = await registrar( 'FormAsig', values, setMsgRegistro, reset );
            !response && setCodigoData(deleteCodigoState) ; //response == false => 0 errores.
            // si no hay errores, actualizar el estado de los codigos, elimninar el que fue asignado.
        }
        
       setTimeout(() => {
        setMsgRegistro({ state: false, msg: '' });
       }, 2800);
    }

    return (
        <div className="relacionar">
        { msgRegistro.state && <p>{ msgRegistro.msg }</p> }
        <h2>Asignación de Articulos</h2>
        <form className="relacionarArticulos" onSubmit={ handleSubmit }>
           
            <select name='codigo_articulo'value={codigo_articulo} onChange={ handleInputChange } >
            <option value='default'>Código de los artículos</option>
                { codigoData.map( item => (
                    <option value={item.codigo} key={item.codigo}>
                        {item.codigo} &nbsp;&nbsp;&nbsp;&nbsp;{item.descripcion} ...
                    </option>
                )) 
                }
            </select>

            <input 
                type="text" 
                placeholder='Cédula del Responsable'
                name='cedula_usuario'
                value={cedula_usuario}
                onChange={handleInputChange} 
            /> 
            <label htmlFor="fechaAsignacion" className="fechaAsignacion">Fecha de Asignacion </label>
            <input 
                type="date" 
                id="fechaAsignacion"
                name='fecha_asignacion'
                value={fecha_asignacion}
                onChange={handleInputChange} 
            />
            <button  type='submit' className='botonEnviar'>
                Guardar Registro
            </button>
        </form>
    </div>
    )
}

export default FormAsig
