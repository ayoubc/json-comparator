import React, { useState } from 'react';

import './style.css';
import { JsonObj } from '../../types';
import { sortObject } from '../../utils';


type Props = {
    update: (value: JsonObj, jsonKey: Number) => void,
    jsonKey: Number,
    keysToIgnore: string[]
}

function JsonContainer({ update, jsonKey, keysToIgnore }: Props) {

    const [content, setContent] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);

    const handleChange = (value: string) => {
        clearTimeout(timer);
        setContent(value);
        const timeOut = setTimeout(() => {
            try {
                if (value) {
                    // sort object so the user can see the comparaison easily
                    const obj: JsonObj = sortObject(JSON.parse(value));
                    update(obj, jsonKey);
                    setContent(JSON.stringify(obj, null, 2));
                }
                setError(null);
            } catch (error) {
                console.error('Invalid JSON format', error);
                setError('Invalid JSON format');
            }

        }, 1000);

        setTimer(timeOut);
    }
    
    return (
        <div className='container'>
            <textarea className="json" value={content} onChange={e => handleChange(e.target.value)} placeholder="Enter Json to compare">
            </textarea>
            {error && <small className='error'>{error}</small>}
        </div>
    );
}

export default JsonContainer;
