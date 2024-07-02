import React, { useState } from 'react';

import './App.css';
import { compareObjects, sortObject } from './utils';
import { JsonObj } from './types';
import JsonContainer from './components/json-container';

function App() {
    const [json1, setJson1] = useState<JsonObj>();
    const [json2, setJson2] = useState<JsonObj>();

    const compareObjects = (): void => {
        console.log(sortObject(json1));
        console.log(sortObject(json2));
    }

    const updateObjects = (value: JsonObj, key: Number): void => {
        if (key === 1) setJson1(value);
        if (key === 2) setJson2(value);
    }

    return (
        <div className="App">
            <JsonContainer update={updateObjects} jsonKey={1}/>
            <button onClick={compareObjects}>compare</button>
            <JsonContainer update={updateObjects} jsonKey={2}/>
        </div>
    );
}

export default App;
