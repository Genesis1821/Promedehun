import { useRouteMatch, Switch, Route, useHistory } from 'react-router';
import BotonVolver from "../components/BotonVolver";
import './opcionesSistema.css';
import NavbarConfiguracion from "../components/navbars/NavbarConfiguracion";
import UpdateArticulo from "../components/UpdateArticulo";
import TableHistorial from '../components/tablas/TableHistorial';
import UsersRetirados from '../components/tablas/UsersRetirados';





const OpcionesSistema = () => {
    const body = document.querySelector('body');
    body.style.backgroundColor = '#fcdcc1';
    const { path } = useRouteMatch();
    const router = useHistory();

    const isLogin = JSON.parse(window.localStorage.getItem('user-access')) || false;

    !isLogin?.acceso && router.push('/');

    return (
        <>
            <BotonVolver />
            <div className='opcionesSistema'>
                <NavbarConfiguracion />

                <Switch>
                    <Route path={`${path}/historial-articulos`} exact component={TableHistorial} />
                    <Route path={`${path}/usuarios-retirados`} exact component={UsersRetirados} />
                    <Route path={`${path}/actualizarCodigo`} exact component={UpdateArticulo} />
                </Switch>
            </div>
        </>
    )
}

export default OpcionesSistema;
