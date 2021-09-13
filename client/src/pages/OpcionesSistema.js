import { useState } from "react";
import Desasignacion from "../components/modal/Desasignacion";
import RetirarUsuario from "../components/modal/RetirarUsuario";
import UpdateCodigo from "../components/modal/updatesArticulos/UpdateCodigo";
import UpdateUsuario from "../components/modal/UpdateUsuario";
import TableHistorial from '../components/tablas/TableHistorial';
import UsersRetirados from "../components/tablas/UsersRetirados";





const OpcionesSistema = () => {
    const [ openModal, setOpenModal ] = useState(false);
    const [ modalUpdateUser, setModalUpdateUser ] = useState(false);
    const [ modalRetirarUser, setModalRetirarUser ] = useState(false);
    const [ modalUpdateCodigo, setModalUpdateCodigo ] = useState(false);

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




           <TableHistorial /> 
           {/* <UsersRetirados /> */}

        </div>
    )
}

export default OpcionesSistema;
