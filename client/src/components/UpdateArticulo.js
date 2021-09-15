import { useEffect, useState } from "react";
import { apiUpdateItem, allArticulos } from "../api/api";
import { useForm } from "../helpers/useForm";
import InputUpdateItem from "./InputUpdateItem";
// import './modal/updatesArticulos/updatesArticulos.css';
import '../components/forms/FormProduct.css';


const initalState = { descripcion: '', marca: '', modelo: '', serial: '', condicion_ingreso: 'Patrimonial/Comprado', fecha_ingreso: '', factura: '' }

const UpdateArticulo = () => {
    const [ articulos, setArticulos ] = useState([]);
    const [inputCodigoAndResponse,setInputCodigoAndResponse ] = useState({codigo: '', response: ''});
    const [ values, handleInputChange, reset ] = useForm(initalState);

    const getAllArticulos = async() => {
        const { data } = await allArticulos();
        const filterItemsActivos = data.filter( item => item.estado_actual === 'Activo' );
        setArticulos(filterItemsActivos);
    }

    const handelInputCodigo = ({target}) => {
        setInputCodigoAndResponse({ ...inputCodigoAndResponse, codigo: target.value });
    }

    useEffect(() => {
        getAllArticulos();
    }, [])

    useEffect(() => {
        const findArticuloSelected = articulos.find( item => item.codigo === inputCodigoAndResponse.codigo.trim().split(' ')[0] )
        if( !findArticuloSelected ){
            reset(initalState);
        }else{
            const { descripcion, marca, modelo, serial, condicion_ingreso, fecha_ingreso, factura } = findArticuloSelected;
            reset({ descripcion, marca, modelo, serial, condicion_ingreso, fecha_ingreso, factura });
        }
       
    }, [inputCodigoAndResponse.codigo])



    const handleSubmit = async(e) => {
        e.preventDefault();
        values.codigo = inputCodigoAndResponse.codigo.trim().split(' ')[0];

        const { data:{ respuesta }} = await apiUpdateItem(values);
        setInputCodigoAndResponse({...inputCodigoAndResponse, response: respuesta});


        setTimeout(() => {
            setInputCodigoAndResponse({codigo: '', response: ''});
            reset(initalState);
            getAllArticulos();

        }, 2400);
    
    }

    return (
            <form className='compUpdateItem' onSubmit={ handleSubmit }>
                <h3>Actualizar artículo</h3>
                <label>Código del artículo</label>
                <input 
                    type='text'
                    name='codigo' 
                    placeholder='Buscar por código'
                    value={inputCodigoAndResponse.codigo}
                    onChange={handelInputCodigo}
                    list='my-list'
                    autoComplete='off'
                />  
                 <datalist id='my-list'>
                  { articulos.map( item => (
                        <option key={item.codigo} value={`${item.codigo }  ${ item.descripcion}`} />               
                    )) 
                  }
                 
                </datalist>  

                <label>Descripción</label>
                <InputUpdateItem  
                    name='descripcion' 
                    placeholder='Descripción'
                    value={values.descripcion}
                    onChangeFunc={handleInputChange}
                />  

                <label>Marca</label>
                <InputUpdateItem  
                    name='marca' 
                    placeholder='Marca'
                    value={values.marca}
                    onChangeFunc={handleInputChange}
                /> 

                <label>Modelo</label>
                <InputUpdateItem     
                    name='modelo' 
                    placeholder='Modelo'
                    value={values.modelo}
                    onChangeFunc={handleInputChange}
                /> 

                <label>Serial</label>
                <InputUpdateItem 
                    name='serial' 
                    placeholder='Serial'
                    value={values.serial}
                    onChangeFunc={handleInputChange}  
                />  

                <label>Fecha de Ingreso</label>
                <InputUpdateItem  
                      name='fecha_ingreso' 
                      value={values.fecha_ingreso}
                      onChangeFunc={handleInputChange}  
                      type='date'
                />  

                <label>Condición de ingreso</label>
                <select 
                    name='condicion_ingreso' 
                    value={values.condicion_ingreso} 
                    onChange={handleInputChange}
                >
                    <option value='Patrimonial/Comprado'>Patrimonial/Comprado</option>
                    <option value='Patrimonial/Prestado'>Patrimonial/Prestado</option>
                    <option value='Prestamo/Arrendadores'>Prestamo/Arrendadores</option>
                </select>

                <label>Factura</label>
                <InputUpdateItem  
                     name='factura' 
                     placeholder='Factura'
                     value={values.factura}
                     onChangeFunc={handleInputChange}  
                />  
                { inputCodigoAndResponse.response.length > 0 && <p>{inputCodigoAndResponse.response}</p> }
                <button type='submit'>Guardar cambios</button>
            </form>
    )
}

export default UpdateArticulo;
