import React from 'react';
import { TodoContext } from '../context';
import { SortOrderEnum } from '../types';
import useFetchTodos from '../utils/useFetchData';

interface HeaderProps {
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setOpened }) => {
  const { searchString, setSearchString, filter, setFilter, sort, setSort } =
    React.useContext(TodoContext);

  const fetchData = useFetchTodos();

  React.useEffect(() => {
    fetchData(searchString, sort, filter);
  }, [sort, filter]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const handleSortingChange = (option: SortOrderEnum) => {
    setSort(option);
  };

  const handleFilterChange = (option: boolean | null) => {
    setFilter(option);
  };

  return (
    <div className="w-full h-16 bg-blue-500 flex items-center justify-between px-4 text-white">
      <div className="flex items-center space-x-4">
        <p className="text-lg font-bold">Sort by priority:</p>
        <button
          onClick={() => handleSortingChange(SortOrderEnum.ASC)}
          className={`text-sm  hover:underline ${sort === 'asc' ? 'text-yellow-500' : ''}`}>
          ACS
        </button>
        <button
          onClick={() => handleSortingChange(SortOrderEnum.DSC)}
          className={`text-sm  hover:underline ${sort === 'dsc' ? 'text-yellow-500' : ''}`}>
          DSC
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <p className="text-lg font-bold">Filter by status:</p>
        <button
          onClick={() => handleFilterChange(null)}
          className={`text-sm  hover:underline ${filter === null ? 'text-yellow-500' : ''}`}>
          All
        </button>
        <button
          onClick={() => handleFilterChange(false)}
          className={`text-sm  hover:underline ${filter === false ? 'text-yellow-500' : ''}`}>
          Undone
        </button>
        <button
          onClick={() => handleFilterChange(true)}
          className={`text-sm  hover:underline ${filter === true ? 'text-yellow-500' : ''}`}>
          Done
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={searchString}
          onChange={handleInputChange}
          placeholder="Search..."
          className="px-2 py-1 border border-white rounded text-black"
        />
        <button
          onClick={() => fetchData(searchString, sort, filter)}
          className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100">
          Search
        </button>
      </div>
      <button
        className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100"
        title="Create Todo"
        onClick={() => setOpened(true)}>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 inline-block align-text-top">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default Header;
