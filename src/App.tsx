import React from 'react';

import './App.css';
import JsonContainer from './components/json-container';

function App() {
    return (
        <div className="App">
            <JsonContainer />
            <button >compare</button>
            <JsonContainer />
        </div>
    );
}

export default App;
