import { useEffect, useState } from "react";
import { apiGetUsersRetirados } from "../../api/api";



const UsersRetirados = () => {

    const [ dataUsers, setDataUsers ] = useState([]);

    useEffect(() => {
        const getUserRetirados = async() => {
            const { data } = await apiGetUsersRetirados();
            setDataUsers(data);
        }
        
        getUserRetirados()
        return () => {
            setDataUsers([]);
        }
    }, [])

    return (
        <>
        {/* aqui puedes poner un parrafo que diga, Usuarios retirados  */}
              {
                  dataUsers.length > 0 ?
                  <table>
                    <thead>
                        <tr>
                            <th>Cédula</th>
                            <th>Usuario</th>
                            <th>Estado</th>
                            <th>Fecha de retiro</th>          
                        </tr>
                    </thead>
                    <tbody>          
                        {
                            dataUsers.map( user => (
                                <tr key={user.cedula}>
                                    <td>{user.cedula}</td>
                                    <td>{user.responsable}</td>
                                    <td>Retirado</td>
                                    <td>{ user.fecha_retiro }</td>
                                </tr> 
                            ))
                        }                          
                    </tbody>   
                </table>  
                : <p>Sin (0) resultados.</p>
              }   
        </>
    )
}

export default UsersRetirados;
