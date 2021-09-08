import './Registros.css';
import FormAsig from "../components/forms/FormAsig";
import FormProduct from "../components/forms/FormProduct";
import FormUsers from "../components/forms/FormUsers";
import Inventario from "../components/tablas/Inventario";
import ArticulosByUser from '../components/tablas/ArticulosByUser';



const Registros = () => {
    return (
      <>
        <div className="content">
          <FormProduct /> 
          <div className="flex">
            <FormUsers />
            <FormAsig /> 
          </div>
          
        </div>
        <Inventario />
        {/* <ArticulosByUser /> */}
      </>
    )
}

export default Registros;
