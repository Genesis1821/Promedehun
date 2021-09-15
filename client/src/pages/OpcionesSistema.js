import { useRouteMatch, Switch, Route } from 'react-router';
import BotonVolver from "../components/BotonVolver";
import './opcionesSistema.css';
import NavbarConfiguracion from "../components/navbars/NavbarConfiguracion";
import UpdateArticulo from "../components/UpdateArticulo";





const OpcionesSistema = () => {
    const body = document.querySelector('body');
    body.style.backgroundColor = '#fcdcc1';
    const { path } = useRouteMatch();


    return (
        <>
            <BotonVolver />
            <div className='opcionesSistema'>
                <NavbarConfiguracion />
           
                <Switch>
                    <Route path={`${path}/actualizarCodigo`} exact component={UpdateArticulo} />
                </Switch>
            </div>
        </>
    )
}

export default OpcionesSistema;
