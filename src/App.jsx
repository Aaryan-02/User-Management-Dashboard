import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import UserManagement from './components/UserManagement/UserManagement';

function App() {
  return (
    <div className="bg-white h-100 d-flex flex-column">
      <Navbar />

      <main className="mt-5 flex-grow-1">
        <UserManagement />
      </main>
    </div>
  );
}

export default App;
