import React from 'react';
import { getAllTodos } from '../requests';
import { TodoContext } from '../context';
import { SortOrderEnum } from '../types';

const useFetchTodos = () => {
  const { setTodos } = React.useContext(TodoContext);

  const fetchData = async (searchString: string, sort: SortOrderEnum, filter: boolean | null) => {
    try {
      const data = await getAllTodos({
        search_string: searchString,
        sort_order: sort,
        completed: filter,
      });
      setTodos(data);
      console.log('data', data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  return fetchData;
};

export default useFetchTodos;
