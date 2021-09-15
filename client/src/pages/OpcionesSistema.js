import { useState } from "react";
import Desasignacion from "../components/modal/Desasignacion";
import RetirarUsuario from "../components/modal/RetirarUsuario";
import UpdateCodigo from "../components/modal/updatesArticulos/UpdateCodigo";
import UpdateEstadoAcutal from "../components/modal/updatesArticulos/UpdateEstadoAcutal";
import UpdateUsuario from "../components/modal/UpdateUsuario";
import TableHistorial from '../components/tablas/TableHistorial';
import UsersRetirados from "../components/tablas/UsersRetirados";
import UpdateArticulo from "../components/UpdateArticulo";





const OpcionesSistema = () => {
    const body = document.querySelector('body');
    body.style.backgroundColor = '#fcdcc1';
    const [ openModal, setOpenModal ] = useState(false);
    const [ modalUpdateUser, setModalUpdateUser ] = useState(false);
    const [ modalRetirarUser, setModalRetirarUser ] = useState(false);
    const [ modalUpdateCodigo, setModalUpdateCodigo ] = useState(false);
    const [ modalUpdateEstadoActual, setModalUpdateEstadoActual] = useState(false);

    return (
        <div>
            <button onClick={ () => setOpenModal(true) } >
                Desasignar artículo
            </button>

            <button onClick={ () => setModalUpdateUser(true) } >
                Actualizar Usuario
            </button>

            <button onClick={ () => setModalRetirarUser(true) } >
                Retirar usuario
            </button>
            <button onClick={ () => setModalUpdateCodigo(true) } >
                Actualizar código
            </button>
            <button onClick={ () => setModalUpdateEstadoActual(true) } >
                Cambiar estado actual del producto
            </button>
           
           {
               openModal &&  <Desasignacion  closeModal={setOpenModal} />              
           }
           {
               modalUpdateUser && <UpdateUsuario closeModal={setModalUpdateUser}  />
           }
           {
               modalRetirarUser && <RetirarUsuario closeModal={setModalRetirarUser} />
           }
           {
               modalUpdateCodigo && <UpdateCodigo  closeModal={setModalUpdateCodigo} />
           }
           {
               modalUpdateEstadoActual && <UpdateEstadoAcutal closeModal={setModalUpdateEstadoActual} />
           }

           
           {/* <TableHistorial />  */}
           {/* <UsersRetirados /> */}
           <UpdateArticulo />

        </div>
    )
}

export default OpcionesSistema;
