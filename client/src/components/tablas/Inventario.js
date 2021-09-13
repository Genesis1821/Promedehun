import { useEffect, useState } from 'react';
import { allArticulos } from '../../api/api';
import ModelTableArticle from './ModelTableArticle';


const Inventario = () => {

    const [ articulos, setArticulos ] = useState([]);

    const getAllArticulos = async({target}) => {
        const { data } = await allArticulos();

        if ( target.value !== 'default' ) {
            const articulosByStatus = data.filter( item => item.estado_actual === target.value );
            setArticulos(articulosByStatus);
        }else {
            setArticulos(data);
        }
    }    

    useEffect(() => { 
        // simular el valor del evento en default, para que la funcion actualice el estado con toda la data.
        let helpObjec = { target: { value: 'default' } };
        getAllArticulos(helpObjec);
    }, [])


    return(
        <div className='contentTablas'>
            <select className='selectArticulos' onChange={ getAllArticulos } > 
                <option value='default'>Todos los artículos</option>
                <option value='Activo'>Artículos activos</option>
                <option value='Desincorporado'>Artículos desincorporados</option>
            </select>

             <ModelTableArticle  articulos={ articulos } />
        </div>

       
    )
};
export default Inventario;