import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
        <nav className="bg-blue-600 p-4 text-white shadow-lg flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Managment App</h1>
        <div className="flex space-x-4">
            <Link to="/" className="px-4 py-2 rounded bg-blue-700 hover:bg-blue-800 transition-colors">Home</Link>
            <Link to="/add" className="px-4 py-2 rounded bg-blue-700 hover:bg-blue-800 transition-colors">Add Task</Link>
        </div>
    </nav>
    </div>
  )
}

export default Header