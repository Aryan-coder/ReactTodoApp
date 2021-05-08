import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Sign from './components/Sign'
//import Todo from './components/Todo'

import React, {Suspense} from 'react'

const Todo = React.lazy(()=>import('./components/Todo'))

function App() {
  return (
    <div className="App">
    <Suspense fallback={<h4>Loading...</h4>} >
      <Router>
        <Switch>
          <Route path='/' exact ><Sign/></Route>
          <Route path='/todo' exact><Todo/></Route>
        </Switch>
      </Router>
    </Suspense>
    </div>
  );
}

export default App;
