import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button,  util } from './lib/my_components';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
        <div>
          Manual Search
        </div>
        <Button>Smart Search</Button>
        { util.capitalize("heyeyeye hyosaDDd ADSASD") }
      </div>
    </div>
  );
}

export default App;
