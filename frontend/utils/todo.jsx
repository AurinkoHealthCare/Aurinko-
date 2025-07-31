import React, { useState } from 'react';

const TodoApp = () => {
    const [list,setList]=useState([])

    function Add(){
    }
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl text-center font-semibold mb-6">To-Do List</h1>
      <div className="flex mb-4">
        <input 
          type="text" 
          placeholder="Add a new todo" 
          className="w-4/5 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
        onClick={Add} 
          className="w-1/5 bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none"
        >
          Add
        </button>
      </div>

      <ul className="space-y-4">
        <li className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm">
         
        </li>
      </ul>
    </div>
  );
};

export default TodoApp;
