import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../context/TasksContext';

function EditTask() {
    const { id } = useParams();
    const { getTaskById, updateTask } = useTasks();
    const navigate = useNavigate();

    const task = getTaskById(id);

    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [statut, setStatut] = useState('To do');

    useEffect(() => {
        if (task) {
            setTitre(task.titre);
            setDescription(task.description);
            setStatut(task.statut);
        }
    }, [task]);

    if (!task) return <div className="text-center p-10">Chargement...</div>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateTask(task.id, { titre, description, statut });
        navigate('/');
    };

    return (
        <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Modifier : {task.titre}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text" required value={titre} onChange={(e) => setTitre(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <textarea 
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
                    <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Mettre à jour</button>
                </div>
            </form>
        </div>
    );
}
export default EditTask;