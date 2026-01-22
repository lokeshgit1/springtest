import React, { useState } from 'react';
import axios from 'axios';

function NameForm() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!name.trim()) {
            setError('Name cannot be empty');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/name', { name });
            setMessage(`Successfully saved: ${response.data.name}`);
            setName('');
        } catch (err) {
            setError('Failed to save name. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nameInput">Name</label>
                    <input
                        id="nameInput"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {error && <p className="error">{error}</p>}
            {message && <p className="success">{message}</p>}
        </div>
    );
}

export default NameForm;
