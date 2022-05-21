import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/login/Login';
import './home.css';


const Home = () => {
    const body = document.querySelector('body');
    body.style.backgroundColor = '#fff';
    const [acceso, setAcceso] = useState(false);


    useEffect(() => {
        const isLogin = JSON.parse(window.localStorage.getItem('user-access')) || acceso;
        const condition = isLogin && isLogin.acceso;

        condition && setAcceso(true)
    }, [])

    const logout = () => {
        window.localStorage.setItem('user-access', JSON.stringify({ acceso: false }));
        setAcceso(false)
    }


    return (
        <div>
            {acceso &&
                <button className='buttonLogout' onClick={logout} type='button'>
                    Cerrar sesión
                </button>}
            <div className='ContentHome'>
                <h1 className='homeTitle' style={{ marginTop: acceso ? '-20px' : '20px' }}>PROMEDEHUM</h1>
                <img src='/logo.jpg' alt='logo fundacion' className='homeIMG' />

                {acceso &&
                    <div className='contentHomeEnlances'>
                        <Link to='/registros' className='homeEnlances'>Registros</Link>
                        <Link to='/configuracion' className='homeEnlances'>Configuracion</Link>
                    </div>
                }
                {
                    !acceso && <Login setAcceso={setAcceso} />
                }
            </div>
        </div>
    )
}

export default Home;
