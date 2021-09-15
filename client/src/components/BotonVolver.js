import { Link } from 'react-router-dom';
import './botonVolver.css';

const BotonVolver = () => {
    return (
        <Link to='/' className='componetnBtnVolver'>
            <i className="fas fa-long-arrow-alt-left"></i> &nbsp; &nbsp;Regresar
        </Link>
    )
}

export default BotonVolver;
