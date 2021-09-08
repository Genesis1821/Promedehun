import axios from 'axios';

const urlArticulo = 'http://localhost:4000/api/articulo/';
const urlUser = 'http://localhost:4000/api/usuario/';
const urlAsignacionItem = 'http://localhost:4000/api/asignacion';


// Api peticiones Articulos
export const apiRegistrarItem = (values) => axios.post(`${urlArticulo}registro`, values);
export const allArticulos = () => axios.get(`${urlArticulo}allArticulos`);
export const apiGetArticulosByUser = ( cedulaUser ) => axios.get(`${urlArticulo}articulos-usuario/${cedulaUser}`);
export const apiGetCodigosItems = () => axios.get(`${urlArticulo}codigoArticulos`);



    
// Api peticiones Usuario
export const apiRegistroUser = (datos) => axios.post(`${urlUser}registro `, datos);




// Api peticiones Asignacion de Articulo
export const apiAsignarArticulo = (datos) => axios.post(`${urlAsignacionItem}`, datos) ;
export const apiGetAnAsignacion = (codigo) => axios.get(`${urlAsignacionItem}/${codigo}`);
export const apiDesasignarArticulo = (values) => axios.put(`${urlAsignacionItem}`, values);
export const apiHistorialAsignaciones = () => axios.get(`${urlAsignacionItem}-historial`);
export const apiHistorialByArticulo = (codigo) => axios.get(`${urlAsignacionItem}/historial/${codigo}`);
 

