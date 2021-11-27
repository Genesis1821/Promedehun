import { apiValidarLogin } from '../api/api';


export const loginAction = async (datos, loadingFunc, errorFunc, resetForm) => {
    try {
        loadingFunc(true);
        const { data } = await apiValidarLogin(datos);
        loadingFunc(false);

        if (!data.acceso) {
            errorFunc('Datos incorrectos, vuelve a intentarlo');
            return false;
        }

        resetForm();
        window.localStorage.setItem('user-access', JSON.stringify(data));
        return true;
    } catch (err) {
        console.log(err);
    }
}




