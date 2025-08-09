import React from 'react';
import Avatar from 'react-avatar';

const ParticipantList = ({ clients, isOwner, currentUser, onKickUser, roomOwnerId }) => {
    return (
        <div className="clientsList">
            {clients.map((client) => {
                // Determine which label to show, if any
                let label = null;
                if (client.userId === currentUser?.id) {
                    label = '(You)';
                } else if (client.userId === roomOwnerId) {
                    label = '(Owner)';
                }

                return (
                    <div key={client.socketId} className="client">
                        <Avatar
                            name={client.userName}
                            size={35}
                            round={true}
                            style={{ borderRadius: '50%' }}
                        />
                        <span className="userName">{client.userName}</span>
                        
                        {/* Render the label if it exists */}
                        {label && <span className="participant-label">{label}</span>}
                        
                        {isOwner && currentUser && client.userId !== currentUser.id && (
                            <button
                                className="kickBtn"
                                onClick={() => onKickUser(client.userId, client.userName)}
                                title={`Kick ${client.userName}`}
                            >
                                &times;
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ParticipantList;