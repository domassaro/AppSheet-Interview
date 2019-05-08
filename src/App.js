import React from 'react';
import './App.css';
import SearchBar from './searchBar';
import Profile from './profile';



function App() {
  return (
    <div className="App"> 
      <div className="search-bar">
        <SearchBar/>
      </div>
        <Profile />
    </div>
  );
}

export default App;
