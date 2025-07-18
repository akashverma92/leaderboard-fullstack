import React, { useState, useEffect } from 'react';
import './UserSelector.css';
import { FaUserCircle } from 'react-icons/fa';
import { FaCoins } from 'react-icons/fa';

const UserSelector = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [message, setMessage] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);

  useEffect(() => {
    fetch('https://leaderboard-backend-x4v1.onrender.com/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  const handleClaim = () => {
    if (!selectedUserId) return alert('Please select a user');
    fetch(`https://leaderboard-backend-x4v1.onrender.com/claim/${selectedUserId}`, {
      method: 'POST',
    })
      .then(res => res.json())
      .then(data => {
        setMessage(`🎯 ${data.name} received ${data.points} points!`);
        setShowClaimModal(false);
      })
      .catch(err => console.error(err));
  };

  const handleAddUser = () => {
    if (!newUserName.trim()) return;
    fetch('https://leaderboard-backend-x4v1.onrender.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newUserName }),
    })
      .then(res => res.json())
      .then(newUser => {
        setUsers(prev => [...prev, newUser]);
        setNewUserName('');
        setShowAddUserModal(false);
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      {/* Top left icons */}
      <div className="icon-buttons">
        <FaUserCircle className="icon" onClick={() => setShowAddUserModal(true)} />
        <FaCoins className="icon" onClick={() => setShowClaimModal(true)} />
      </div>

      {/* Claim Modal */}
      {showClaimModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Claim Points</h3>
            <select onChange={(e) => setSelectedUserId(e.target.value)} value={selectedUserId}>
              <option value="">-- Select User --</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>{user.name}</option>
              ))}
            </select>
            <button onClick={handleClaim}>Claim</button>
            <button className="close" onClick={() => setShowClaimModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New User</h3>
            <input
              type="text"
              placeholder="Enter name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <button onClick={handleAddUser}>Add</button>
            <button className="close" onClick={() => setShowAddUserModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Success Message */}
      {message && <p className="result-message">{message}</p>}
    </div>
  );
};

export default UserSelector;
