import './Inventario.css'

const ModelTableArticle = ({articulos}) => {
    return(
        <div className="Inventario">
            <table>
               <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Cédula</th>
                        <th>Responsable</th>            
                        <th>Condición de Ingreso</th>
                        <th>Fecha de Ingreso</th>
                        <th>Estado Actual</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Serial</th>     
                        <th>Factura</th>        
                    </tr>
               </thead>
                <tbody>
                    {
                        articulos.map( item => (
                            <tr key={ item.codigo } >
                                <td>{ item.codigo }</td>
                                <td>{ item.descripcion }</td>
                                <td>{ item.cedula }</td>
                                <td>{ item.responsable }</td>                        
                                <td>{item.condicion_ingreso  }</td>
                                <td>{ item.fecha_ingreso }</td>
                                <td>{ item.estado_actual }</td>
                                <td>{ item.marca }</td>
                                <td>{ item.modelo }</td>
                                <td>{ item.serial }</td>
                                <td>{ item.factura }</td>
                              
                            </tr>
                        ))
                    }
                </tbody>           
            </table>            
        </div>
    )
}

export default ModelTableArticle
