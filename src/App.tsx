import React, { useState } from 'react';

import './App.css';
import { isEqual } from './utils';
import { JsonObj } from './types';
import JsonContainer from './components/json-container';


enum Equal {
    FALSE = 0,
    TRUE = 1,
    NEUTRAL = 2 // 2 is neutral value, means no results yet
}


function App() {
    const [json1, setJson1] = useState<JsonObj>();
    const [json2, setJson2] = useState<JsonObj>();
    const [results, setResults] = useState<Number>(Equal.NEUTRAL);

    const compareObjects = (): void => {
        // const obj1 = sortObject(json1);
        // const obj2 = sortObject(json2);
        console.log(json1);
        console.log(json2);
        const result = isEqual(json1, json2);
        console.log(result);
        setResults(result ? Equal.TRUE : Equal.FALSE);
    }

    const updateObjects = (value: JsonObj, key: Number): void => {
        if (key === 1) setJson1(value);
        if (key === 2) setJson2(value);
        
        // the changes of json objects will reset the results to neutral value
        setResults(Equal.NEUTRAL);
    }

    const getResultsClass = () => {
        return results === Equal.NEUTRAL ? 'hide-result' : (results === Equal.TRUE ? 'green' : 'red');
    }

    const getResultsText = () => {
        return results === Equal.TRUE ? 'Objects are equal!' : 'Objects are not equal!';
    }


    return (
        <>
            {results !== Equal.NEUTRAL && <div className={getResultsClass()}>{getResultsText()}</div>}
            <div className="App">
                <JsonContainer update={updateObjects} jsonKey={1} />
                <button className="btn-compare"
                    onClick={compareObjects} disabled={!json1 || !json2}>Compare</button>
                <JsonContainer update={updateObjects} jsonKey={2} />
            </div>
        </>
    );
}

export default App;
