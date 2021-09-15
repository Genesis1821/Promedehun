import img from './logo.jpg';
import './home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const body = document.querySelector('body');
    body.style.backgroundColor = '#fff';

    return (
        <div className='ContentHome'>
            <h1 className='homeTitle'>Promedehun</h1>
            <img src={img} alt='logo fundacion' className='homeIMG' />
            
            <div className='contentHomeEnlances'>
                <Link to='/registros' className='homeEnlances'>Registros</Link>
                <Link to='/configuracion' className='homeEnlances'>Configuracion</Link>
            </div>  
        </div>
    )
}

export default Home;
