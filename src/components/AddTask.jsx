import React, { useState } from 'react';
import { useTasks } from '../context/TasksContext';
import { useNavigate, Link } from 'react-router-dom';

function AddTask() {
    const { addTask } = useTasks();
    const navigate = useNavigate();

    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [statut, setStatut] = useState('To do');

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (!titre.trim()) return alert("Title is required");

        const newTask = {
            titre,
            description,
            statut
        };

        await addTask(newTask);
        navigate('/');
    };

    return (
        <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Task</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input 
                        type="text" 
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter task title"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        rows="3"
                        placeholder="Enter task description"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select 
                        value={statut}
                        onChange={(e) => setStatut(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                    <Link to="/" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                        Cancel
                    </Link>
                    <button 
                        type="submit" 
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Save Task
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddTask