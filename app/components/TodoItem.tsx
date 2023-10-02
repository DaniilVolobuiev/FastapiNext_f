import React, { useState } from 'react';
import { TodoContext } from '../context';
import { deleteTodo, upgradeTodo } from '../requests';
import { ITodo, ITodoContext } from '../types';
import useFetchTodos from '../utils/useFetchData';

const TodoItem = ({ title, completed, priority, id }: ITodo) => {
  const [isChecked, setIsChecked] = useState<boolean>(completed);

  const { setTodos, searchString, sort, filter } = React.useContext<ITodoContext>(TodoContext);

  const fetchData = useFetchTodos();

  const deleteItem = async () => {
    try {
      await deleteTodo(id);
      setTodos([]);
      fetchData(searchString, sort, filter);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const switchStatus = async () => {
    try {
      await upgradeTodo(id, !isChecked);
      setIsChecked(!isChecked);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div
      className={`border p-4 mb-5 rounded-lg shadow-md flex justify-between items-center ${
        isChecked ? 'bg-gray-200' : 'bg-white}'
      }`}>
      <div className="flex items-center">
        <div>
          <p className={`font-semibold ${isChecked ? 'line-through' : ''}`}>{title}</p>
          <p className="text-gray-600">Priority: {priority}</p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <label className="cursor-pointer flex items-center gap-2">
          {isChecked ? 'Done' : 'In Progress'}
          <input
            type="checkbox"
            checked={isChecked}
            onClick={switchStatus}
            defaultChecked
            className="mr-2 cursor-pointer"
          />
        </label>
        <button
          onClick={deleteItem}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
