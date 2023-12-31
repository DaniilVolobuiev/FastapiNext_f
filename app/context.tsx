import React from 'react';
import { ITodo, ITodoContext, SortOrderEnum } from './types';
import { FILTER_OPTIONS } from './constants';

interface TodoContextWrapperProps {
  children: React.ReactNode;
}
// @ts-ignore
const TodoContext = React.createContext<ITodoContext>(null);

const TodoContextWrapper = ({ children }: TodoContextWrapperProps) => {
  const [todos, setTodos] = React.useState<ITodo[]>([]);
  const [searchString, setSearchString] = React.useState<string>('');
  const [filter, setFilter] = React.useState<boolean | null>(FILTER_OPTIONS.ALL);
  const [sort, setSort] = React.useState<SortOrderEnum>(SortOrderEnum.ASC);
  const [loading, setLoading] = React.useState<boolean>(false);

  const contextValue = {
    todos,
    setTodos,
    searchString,
    setSearchString,
    filter,
    setFilter,
    sort,
    setSort,
    loading,
    setLoading,
  };

  return <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>;
};

export { TodoContext, TodoContextWrapper };
