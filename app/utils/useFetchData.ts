import React from 'react';
import { getAllTodos } from '../requests';
import { TodoContext } from '../context';
import { SortOrderEnum } from '../types';

const useFetchTodos = () => {
  const { setTodos, setLoading } = React.useContext(TodoContext);

  const fetchData = async (searchString: string, sort: SortOrderEnum, filter: boolean | null) => {
    setLoading(true);
    try {
      const data = await getAllTodos({
        search_string: searchString,
        sort_order: sort,
        completed: filter,
      });
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  return fetchData;
};

export default useFetchTodos;
