import React, { useState } from 'react';

import './style.css';


function JsonContainer() {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleChange = (value: string) => {
        
    }
    return (
        <div className='container'>
            <textarea className="json" value={content} onChange={(e) => {
                console.log(e.target.value);

                try {
                    const { value } = e.target;
                    JSON.parse(value)
                    setContent(value);
                    setError('');
                } catch (error) {
                    console.error('Invalid JSON format', error);
                    setError('Invalid JSON format');
                }
            }}>
            </textarea>
            {error && <small className='error'>{error}</small>}
        </div>
    );
}

export default JsonContainer;
