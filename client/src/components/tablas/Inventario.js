import { useEffect, useState } from 'react';
import { allArticulos, apiGenerarPDF } from '../../api/api';
import { pdfEnProcesoAlert, pdfGeneradoAlert } from '../../helpers/alerts';
import { parseAndGenerarPDF } from '../../helpers/generarPdf';
import ModelTableArticle from './ModelTableArticle';


const Inventario = () => {

    const [articulos, setArticulos] = useState([]);

    const getAllArticulos = async ({ target }) => {
        const { data } = await allArticulos();

        if (target.value !== 'default') {
            const articulosByStatus = data.filter(item => item.estado_actual === target.value);
            setArticulos(articulosByStatus);
        } else {
            setArticulos(data);
        }
    }

    useEffect(() => {
        // simular el valor del evento en default, para que la funcion actualice el estado con toda la data.
        let helpObject = { target: { value: 'default' } };
        getAllArticulos(helpObject);
    }, [])

    const generarPdf = async () => {
        pdfEnProcesoAlert();
        const { data } = await apiGenerarPDF(articulos);
        pdfGeneradoAlert();
        parseAndGenerarPDF(data);
    }

    return (
        <div className='contentTablas'>
            <select className='selectArticulos' onChange={getAllArticulos} >
                <option value='default'>Todos los artículos</option>
                <option value='Activo'>Artículos activos</option>
                <option value='Desincorporado'>Artículos desincorporados</option>
            </select>

            <button type='button' onClick={generarPdf} className='generarPdf'>
                Generar <strong>PDF</strong>
            </button>

            <ModelTableArticle articulos={articulos} />
        </div>


    )
};
export default Inventario;