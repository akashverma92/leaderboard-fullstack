import React, { useEffect, useState } from 'react';
import './ClaimHistory.css';

const ClaimHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('https://leaderboard-backend-x4v1.onrender.com/history')
      .then(res => res.json())
      .then(data => setHistory(data.reverse())) 
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="claim-history">
      <h2> Claim History</h2>
      <div className="history-list">
        {history.map((item, index) => (
          <div key={index} className="history-row">
            <span className="username">{item.userId?.name || "Unknown User"}</span>
            <span className="points">+{item.points} pts</span>
            <span className="date">
              {new Date(item.claimedAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClaimHistory;
