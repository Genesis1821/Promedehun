import './Inventario.css';
import { useState } from 'react';
import { apiGetArticulosByUser } from '../../api/api';
import ModelTableArticle from './ModelTableArticle';


const ArticulosByUser = () => {

    const [ articulos, setArticulos ] = useState({ cedula: '', data: [], noResults: '' });

    const handleInputCedula = ({target}) => { 
        setArticulos({
            ...articulos,
        [target.name]: target.value
        })
    }

    const handleSubmit = async() => {
        let errors = 0;
        let cedula = articulos.cedula.trim();

        if( cedula.length > 8 || cedula.length < 7 ){
            setArticulos({ cedula, data: [], noResults: 'Cédula incorrecta, vuelve a intentarlo' });
            errors++
        }else {
            const { data } = await apiGetArticulosByUser( cedula );
           
            if ( data.length > 0 ) setArticulos({ cedula: '', data, noResults: '' })
            else{ 
                setArticulos({ cedula, data, noResults: 'Sin resultados para esa busqueda' }); 
                errors++ 
            }   
        }

        errors > 0 && setTimeout(() => {
            setArticulos({ cedula, data: [], noResults: '' })
        }, 2600);     
    }

    return (
        <div className='contentTablas'>
            <h3 className='titleItemByUser'>Artículos por usuario</h3>
            <input 
                type='text'  
                placeholder='Ingrese la cédula del responsable' 
                className='itemsByUser'
                onChange={ handleInputCedula }
                name='cedula'
                value={ articulos.cedula }
                autoComplete='off'
            />
            <button onClick={handleSubmit} className='btnEnviar'>Buscar</button>
          { articulos.data.length > 0  && <ModelTableArticle articulos={articulos.data} />}

          { articulos.noResults.length > 0 && <p>{ articulos.noResults }</p> }
        </div>
    )
}

export default ArticulosByUser;



