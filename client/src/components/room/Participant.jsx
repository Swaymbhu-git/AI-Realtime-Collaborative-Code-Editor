import React from 'react';
import Avatar from 'react-avatar';

const Participant = ({ userName }) => {
    return (
        <div className="client">
            <Avatar name={userName} size={35} round={true} style={{ borderRadius: '50%' }} />
            <span className="userName">{userName}</span>
        </div>
    );
};

export default Participant;