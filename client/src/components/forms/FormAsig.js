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

    const codigosArticulos = async() => {
        const { data } = await apiGetCodigosItems('FormAsing');
        setCodigoData(data);
    }

    useEffect(() => { 
        codigosArticulos()

        return () => {
            setCodigoData([]);
            setMsgRegistro({ state: false, msg: '' });
            reset();   
        }
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault();
        let cedula = cedula_usuario.trim();

        if( codigo_articulo.length < 7 || cedula.length < 7 || cedula.length > 8 ){
            setMsgRegistro({ state: true, msg: 'El dato es muy corto o la cédula es incorrecta, vuelve a intentarlo.' })
        }else {
            let response = await registrar( 'FormAsig', values, setMsgRegistro, reset );
            !response &&  codigosArticulos(); //response == false => 0 errores.
            // si no hay errores, actualizar el estado de los codigos.
        }
        
       setTimeout(() => {
        setMsgRegistro({ state: false, msg: '' });
       }, 2800);
    }

    return (
        <div className="relacionar">
            { msgRegistro.state && <p class='aviso'>{ msgRegistro.msg }</p> }
            <h2>Asignación de Articulos</h2>
            <form className="relacionarArticulos" onSubmit={ handleSubmit }>
            
                <input type="text" placeholder='Código de los artículos' list='my-list' name='codigo_articulo'value={codigo_articulo} onChange={ handleInputChange } autoComplete='off' />
                <datalist id='my-list'>
                    { codigoData.map( item => (
                            <option key={item.codigo} value={`${item.codigo }  ${ item.descripcion}`} />               
                        )) 
                    }
                    
                </datalist>   

                <input 
                    type="text" 
                    placeholder='Cédula del Responsable'
                    name='cedula_usuario'
                    value={cedula_usuario}
                    onChange={handleInputChange} 
                    autoComplete='off'
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
