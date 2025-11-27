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
        await addTask({ titre, description, statut });
        navigate('/');
    };

    return (
        <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Ajouter une Tâche</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text" placeholder="Titre" required 
                    value={titre} onChange={(e) => setTitre(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <textarea 
                    placeholder="Description" 
                    value={description} onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <select 
                    value={statut} onChange={(e) => setStatut(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="To do">To do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>
                <div className="flex justify-end gap-2">
                    <Link to="/" className="px-4 py-2 bg-gray-200 rounded">Annuler</Link>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Sauvegarder</button>
                </div>
            </form>
        </div>
    );
}
export default AddTask;