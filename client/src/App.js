import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css'
import Registros from "./pages/Registros";
import OpcionesSistema from './pages/OpcionesSistema';
import Home from './pages/Home';



const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/configuracion" component={OpcionesSistema} />
        <Route path="/registros" component={Registros} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  )
}

export default App;
