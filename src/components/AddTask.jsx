import { Link } from 'react-router-dom';

function AddTask() {
    return (
        <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
            <p className="mb-4"><Link to="/" className="text-blue-600 underline">Home Page</Link> After Creation.</p>
        </div>
    )
}

export default AddTask