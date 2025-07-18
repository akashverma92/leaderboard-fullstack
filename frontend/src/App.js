import React from 'react';
import './App.css';
import UserSelector from './components/UserSelector';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory';

function App() {
  return (
    <div className="app-container">
      <h1> Leaderboard</h1>
      <UserSelector />
      <Leaderboard />
      <ClaimHistory />
    </div>
  );
}

export default App;
