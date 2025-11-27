import { useParams } from 'react-router-dom';
import { useTasks } from '../context/TasksContext';

function EditTask() {
    const { id } = useParams();
    const { getTaskById } = useTasks();

    const task = getTaskById(id);

    if (!task) {
        return (
            <div className="p-4 text-center text-red-500 bg-white rounded-lg shadow-md">
                Task {id} Not Found Loading...
            </div>
        );
    }
    
    return (
        <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Modify: {task.titre}</h2>
            <p>Formulaire</p>
        </div>
    );
}

export default EditTask;