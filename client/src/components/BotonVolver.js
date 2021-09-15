import { Link } from 'react-router-dom';
import './botonVolver.css';

const BotonVolver = () => {
    return (
        <Link to='/' className='componetnBtnVolver'>
            Regresar
        </Link>
    )
}

export default BotonVolver;
