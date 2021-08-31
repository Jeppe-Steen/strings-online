
import { Front } from './Pages/Front/Front'
import { Products } from './Pages/Products/Products'
import { Cart } from './Pages/Cart/Cart'
import { Buy } from './Pages/Buy/Buy'
import { Billing } from './Pages/Billing/Billing'
import { Admin } from './Pages/Admin/Admin'
import { Login } from './Pages/Login/Login'

import { Navigation } from './Components/Navigation/Navigation'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import {AppContextProvider} from './Context/ContextProvider';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Navigation />

        <Switch>
          <Route exact path="/"> <Redirect to="/forside" /> </Route>

          <Route exact path="/forside"> <Front /> </Route>

          <Route path="/produkter"> <Products /> </Route>

          <Route exact path="/indkøbskurv"> <Cart /> </Route>

          <Route exact path="/køb"> <Buy /> </Route>

          <Route exact path="/kvittering"> <Billing /> </Route>

          <Route exact path="/Login"> <Login /> </Route>

          <Route exact path="/admin"> <Admin /> </Route>

        </Switch>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
