import React from 'react';
import View from './View/View'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/life-simulation'>
          <View />
        </Route>
      </Router>
    </div>
  );
}

export default App;
