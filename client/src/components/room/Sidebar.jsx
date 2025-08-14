import React from 'react';
import InviteForm from './InviteForm';
import ParticipantList from './ParticipantList';

const Sidebar = ({
    isOwner,
    room,
    onInviteUser,
    clients,
    currentUser,
    onKickUser,
    onCopyRoomId,
    onLeaveRoom,
}) => {
    return (
        <div className="aside">
            {/* --- TOP SECTION (Static) --- */}
            <div>
                <div className="logo">
                    <img className="logoImage" src="/logo1.svg" alt="logo" />
                </div>
                {isOwner && (
                    <div className="sidebar-section">
                        <h4>Invite a User</h4>
                        <InviteForm onInvite={onInviteUser} />
                    </div>
                )}
                <h3>Connected</h3>
            </div>

            {/* --- SCROLLABLE PARTICIPANT LIST --- */}
            <ParticipantList
                clients={clients}
                isOwner={isOwner}
                currentUser={currentUser}
                onKickUser={onKickUser}
                roomOwnerId={room?.owner}
            />

            {/* --- BOTTOM SECTION (Static) --- */}
            <div className="sidebar-footer">
                <button className="btn whiteBtn" onClick={onCopyRoomId}>
                    Copy ROOM ID
                </button>
                <button className="btn leaveBtn" onClick={onLeaveRoom}>
                    Leave
                </button>
            </div>
        </div>
    );
};

export default Sidebar;