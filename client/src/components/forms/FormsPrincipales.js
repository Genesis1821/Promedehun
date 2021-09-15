import '../../pages/Registros.css';
import FormProduct from './FormProduct';
import FormUsers from './FormUsers';

const FormsPrincipales = () => {
    return (
        <div className="content">
            <FormProduct />  
            <FormUsers />
        </div> 
    )
}

export default FormsPrincipales;
