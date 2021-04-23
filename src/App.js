import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Sign from './components/Sign'
import Todo from './components/Todo'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact ><Sign/></Route>
          <Route path='/todo' exact><Todo/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
