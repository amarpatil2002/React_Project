import { useState } from "react";

const Todos = () => {
  const [todos, setTodos] = useState([]); // Stores all todos
  const [input, setInput] = useState(""); // Input field value
  const [editIndex, setEditIndex] = useState(null); // Tracks which todo is being edited

  // Handle Add or Update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return; // Prevent empty todos

    if (editIndex !== null) {
      // const updatedTodos = [...todos];
      // updatedTodos[editIndex] = input;
      // setTodos(updatedTodos);
      // setEditIndex(null);

      setTodos((prev) =>
        prev.map((item,index) =>  
          index === editIndex ? input: item
        )
      );
      setEditIndex(null);
    } else {
      // Add new todo
      setTodos([...todos, input]);
    }

    setInput(""); // Clear input after action
  };

  // Handle Edit
  const handleEdit = (index) => {
    setInput(todos[index]); // Show selected todo in input
    setEditIndex(index); // Remember which todo is being edited
  };

  // Handle Delete
  const handleDelete = (index) => {
    setTodos(((prev) => prev.filter((_,i) => i !== index )));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
        <h3 className="text-2xl font-bold text-center text-blue-600 mb-4">
          📝 Todo List
        </h3>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a task..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg 
                       hover:bg-blue-600 transition-all"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </form>

        {/* Todo List */}
        <ul className="space-y-3">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 
                         border rounded-lg p-3 hover:shadow-sm transition-all"
            >
              <span className="text-gray-800 font-medium">{todo}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-sm bg-yellow-400 hover:bg-yellow-500 
                             text-white px-3 py-1 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-sm bg-red-500 hover:bg-red-600 
                             text-white px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Empty State */}
        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No todos yet 😴 — Add something!
          </p>
        )}
      </div>
    </div>
  );
};

export default Todos;
