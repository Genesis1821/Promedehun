import { Link, useRouteMatch } from 'react-router-dom';
import './navbarReg.css';

const NavbarRegistros = () => {
    const { url } = useRouteMatch();

    return (
        <div className='navContentRegistros'>
            <ul className='navUlRegistros'>
                <Link to={url} className='navEnlacesRegistros'>Usuario | Artículo</Link>
                <Link to={`${url}/formAsignacion`} className='navEnlacesRegistros'>Asignar Artículo</Link>
                <Link to={`${url}/inventario`} className='navEnlacesRegistros'>Inventario</Link>
                <Link to={`${url}/usuarioArticulos`} className='navEnlacesRegistros'>Inventario por Usuario</Link>
            </ul>
        </div>
    )
}

export default NavbarRegistros;
