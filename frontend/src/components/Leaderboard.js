import React, { useEffect, useState } from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  const fetchLeaderboard = () => {
    fetch('http://localhost:5000/leaderboard')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 2000);
    return () => clearInterval(interval);
  }, []);

  const top3 = users.slice(0, 3);
  const others = users.slice(3);

  return (
    <div className="neon-bg leaderboard-wrapper">
      

      {/* TOP 3 BLOCK */}
      <div className="top-3-container">
        {top3.map((user, index) => (
          <div key={user._id} className={`top-card top-rank-${index + 1}`}>
            <div className="badge">{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</div>
            <div className="name">{user.name}</div>
            <div className="points">{user.totalPoints}</div>
          </div>
        ))}
      </div>

      {/* RANK 4 TO 10 */}
      <div className="rank-box">
        {others.slice(0, 7).map((user, idx) => (
          <div key={user._id} className="rank-row">
            <div className="rank">{idx + 4}</div>
            <div className="profile-icon">👤</div>
            <div className="name">{user.name}</div>
            <div className="points">{user.totalPoints}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
