import { apiAsignarArticulo, apiRegistroUser } from "../api/api";

export const registrar = async(component, values, handleState, resetForm ) => {
    let msgResponse = '';
    let errorResponse = false;

    if( component === 'FormUsers' ){
        const { data:{ respuesta, error } } = await apiRegistroUser(values);
        msgResponse = respuesta;
        errorResponse = error;
    }else{
        const { data:{ respuesta, error } } = await apiAsignarArticulo(values);
        msgResponse = respuesta;
        errorResponse = error;
    }
    handleState({ state: true, msg: msgResponse });
    errorResponse === false && resetForm();
    return errorResponse;
}