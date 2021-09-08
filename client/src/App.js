import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Registros from "./pages/Registros";
import './App.css'
import OpcionesSistema from './pages/OpcionesSistema';



const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/configuracion" component={ OpcionesSistema } />
        <Route exact path="/registros" component={ Registros } />
      </Switch>
      
    </Router>
  )
}

export default App;
