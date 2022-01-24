import axios from 'axios';

const urlArticulo = 'http://localhost:4000/api/articulo/';
const urlUser = 'http://localhost:4000/api/usuario/';
const urlAsignacionItem = 'http://localhost:4000/api/asignacion';
const urlPdf = 'http://localhost:4000/api/generar/informe';


// Api peticiones Articulos
export const apiRegistrarItem = (values) => axios.post(`${urlArticulo}registro`, values);
export const allArticulos = () => axios.get(`${urlArticulo}allArticulos`);
export const apiGetArticulosByUser = (cedulaUser) => axios.get(`${urlArticulo}articulos-usuario/${cedulaUser}`);
export const apiGetCodigosItems = (component) => axios.get(`${urlArticulo}codigoArticulos/${component}`);
export const apiItemSinRelaciones = () => axios.get(`${urlArticulo}sinRelacion`); // solos estos pueden actualizar el código.
export const apiUpdateCodigoItem = (values) => axios.put(`${urlArticulo}updateCodigo`, values);
export const apiUpdateItem = (values) => axios.put(`${urlArticulo}updateArticulo`, values);
export const apiChangeEstadoActual = (values) => axios.put(`${urlArticulo}changeEstado`, values);




// Api peticiones Usuario
export const apiRegistroUser = (datos) => axios.post(`${urlUser}registro `, datos);
export const apiValidarLogin = (datos) => axios.post(`${urlUser}login`, datos);
export const apiUsuariosNoRelacionados = () => axios.get(`${urlUser}noRelacionado`);
export const apiGetUsers = () => axios.get(`${urlUser}allUsers`);
export const apiUpdateUser = (values) => axios.put(`${urlUser}updateUsuario`, values);
export const apiRetirarUser = (values) => axios.put(`${urlUser}retirar`, values);
export const apiGetUsersRetirados = () => axios.get(`${urlUser}allUsersRetirados`);

// Api peticiones Asignacion de Articulo
export const apiAsignarArticulo = (datos) => axios.post(`${urlAsignacionItem}`, datos);
export const apiGetAsignacionesActivas = () => axios.get(`${urlAsignacionItem}`);
export const apiDesasignarArticulo = (values) => axios.put(`${urlAsignacionItem}`, values);
export const apiHistorialAsignaciones = () => axios.get(`${urlAsignacionItem}-historial`);
export const apiHistorialByArticulo = (codigo) => axios.get(`${urlAsignacionItem}/historial/${codigo}`);

// Api Generar PDF
export const apiGenerarPDF = (datos) => axios.post(`${urlPdf}`, datos, { responseType: 'blob' });