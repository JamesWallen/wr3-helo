import React from 'react';
import './reset.css';
import './App.css';
import Nav from './Components/Nav/Nav';
import routes from './routes';

const App = props => {
    const location = props.location();
    return (
        <div className="App">
          {location.pathname !== '/' ? <Nav/> : null}
          {routes}
        </div>
    );
   
}

export default App;