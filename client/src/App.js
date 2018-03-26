import React from 'react';
import logo from './resource/Freelancer_logo.png';
import './App.css';

const App = (props) => (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <section className="App-body">
          {props.children}
        </section>
      </div>
    );

export default App;
