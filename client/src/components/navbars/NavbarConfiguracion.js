import { useState } from "react";
import { Link, useRouteMatch } from 'react-router-dom';
import './navbarConfg.css';
import Desasignacion from "../modal/Desasignacion";
import RetirarUsuario from "../modal/RetirarUsuario";
import UpdateCodigo from "../modal/updatesArticulos/UpdateCodigo";
import UpdateEstadoAcutal from "../modal/updatesArticulos/UpdateEstadoAcutal";
import UpdateUsuario from "../modal/UpdateUsuario";


const NavbarConfiguracion = () => {
    const { url } = useRouteMatch();

    const [openModal, setOpenModal] = useState(false);
    const [modalUpdateUser, setModalUpdateUser] = useState(false);
    const [modalRetirarUser, setModalRetirarUser] = useState(false);
    const [modalUpdateCodigo, setModalUpdateCodigo] = useState(false);
    const [modalUpdateEstadoActual, setModalUpdateEstadoActual] = useState(false);


    return (
        <div className='navContentConfig'>
            <ul className='navUlConfig'>
                <button onClick={() => setOpenModal(true)} className='navEnlancesConfig'>
                    Desasignar artículo
                </button>
                <button className='navEnlancesConfig' onClick={() => setModalUpdateUser(true)}>
                    Actualizar usuario
                </button>
                <button className='navEnlancesConfig' onClick={() => setModalRetirarUser(true)}>
                    Retirar usuario
                </button>
                <button className='navEnlancesConfig' onClick={() => setModalUpdateCodigo(true)} >
                    Actualizar código
                </button>
                <button className='navEnlancesConfig' onClick={() => setModalUpdateEstadoActual(true)} >
                    Desincorporar artículo
                </button>
                <Link to={`${url}/actualizarCodigo`} className='navEnlancesConfig'>
                    Actualizar artículo
                </Link>
                <Link to={`${url}/historial-articulos`} className='navEnlancesConfig'>
                    Artículos desincorporados
                </Link>
                <Link to={`${url}/usuarios-retirados`} className='navEnlancesConfig'>
                    Usuarios retirados
                </Link>
            </ul>

            {
                openModal && <Desasignacion closeModal={setOpenModal} />
            }
            {
                modalUpdateUser && <UpdateUsuario closeModal={setModalUpdateUser} />
            }
            {
                modalRetirarUser && <RetirarUsuario closeModal={setModalRetirarUser} />
            }
            {
                modalUpdateCodigo && <UpdateCodigo closeModal={setModalUpdateCodigo} />
            }
            {
                modalUpdateEstadoActual && <UpdateEstadoAcutal closeModal={setModalUpdateEstadoActual} />
            }
        </div>
    )
}

export default NavbarConfiguracion;
