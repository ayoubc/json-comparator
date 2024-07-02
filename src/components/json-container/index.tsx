import React, { useState } from 'react';

import './style.css';
import { JsonObj } from '../../types';


type Props = {
    update: (value: JsonObj, jsonKey: Number) =>  void,
    jsonKey: Number
}

function JsonContainer({update, jsonKey}: Props) {

    const [content, setContent] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);

    const handleChange = (value: string) => {
        clearTimeout(timer);
        setContent(value);
        const timeOut = setTimeout(() => {
            try {
                const obj: JsonObj = JSON.parse(value)
                setError(null);
                update(obj, jsonKey);
            } catch (error) {
                console.error('Invalid JSON format', error);
                setError('Invalid JSON format');
            }
        }, 1000);

        setTimer(timeOut);
    }
    return (
        <div className='container'>
            <textarea className="json" value={content} onChange={e => handleChange(e.target.value)}>
            </textarea>
            {error && <small className='error'>{error}</small>}
        </div>
    );
}

export default JsonContainer;
