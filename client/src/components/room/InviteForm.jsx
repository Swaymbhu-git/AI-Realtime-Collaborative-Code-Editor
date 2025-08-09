import React, { useState } from 'react';

const InviteForm = ({ onInvite }) => {
    const [email, setEmail] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            onInvite(email);
            setEmail('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group-container">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter user's email"
                    className="invite-input"
                    required
                />
                <button type="submit" className="invite-submit-btn" title="Send Invite">
                    →
                </button>
            </div>
        </form>
    );
};

export default InviteForm;