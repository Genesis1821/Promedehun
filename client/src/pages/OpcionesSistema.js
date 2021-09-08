import { useState } from "react";
import Desasignacion from "../components/modal/Desasignacion";

import TableHistorial from '../components/tablas/TableHistorial';




const OpcionesSistema = () => {
    const [ openModal, setOpenModal ] = useState(false);

    return (
        <div>
            <button onClick={ () => setOpenModal(true) } >
                Desasignar artículo
            </button>
           
           {
               openModal &&  <Desasignacion  closeModal={setOpenModal} />              
           }

           <TableHistorial />
        </div>
    )
}

export default OpcionesSistema;
