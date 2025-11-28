import React from 'react';
import { useTasks } from '../context/TasksContext';
import { Link } from 'react-router-dom';

function Home() {
    const { tasks, isLoading, deleteTask } = useTasks();

    const getStatusStyle = (statut) => {
        switch (statut) {
            case 'Done':
                return 'bg-green-100 text-green-800';
            case 'Doing':
                return 'bg-yellow-100 text-yellow-800';
            case 'To do':
            default:
                return 'bg-red-100 text-red-800';
        }
    };

    if (isLoading) {
        return <p className="text-center text-blue-500 text-lg">Loading...</p>;
    }

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Tasks List</h2>
            
            {tasks.length === 0 && !isLoading ? (
                <p className="text-center text-gray-500">No Tasks. <Link to="/add" className="text-blue-600 hover:underline">Add one!</Link></p>
            ) : (
                <div className="space-y-4">
                    {tasks.map(task => (
                        <div 
                            key={task.id} 
                            className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center border-l-4 border-blue-500"
                        >
                            <div className="mb-2 md:mb-0">
                                <p className="text-xl font-semibold text-gray-900">{task.titre}</p>
                                <p className="text-sm text-gray-600">{task.description}</p>
                            </div>

                            <div className="flex items-center space-x-4 mt-2 md:mt-0">
                                
                                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(task.statut)}`}>
                                    {task.statut}
                                </span>

                                <Link 
                                    to={`/edit/${task.id}`} 
                                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors text-sm"
                                >
                                    Modifie
                                </Link>
                                
                                <button 
                                    onClick={() => deleteTask(task.id)} 
                                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;