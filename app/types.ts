export enum SortOrderEnum {
  ASC = 'asc',
  DSC = 'dsc',
}

export type PriorityType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface IGetAllTodos {
  completed: boolean | null;
  search_string: string;
  sort_order: SortOrderEnum;
}

export interface ITodo {
  title: string;
  completed: boolean;
  priority: PriorityType;
  id: number;
}

export interface ICreateTodo {
  title: string;
  priority: PriorityType;
}

export interface ITodoContext {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
  filter: boolean | null;
  setFilter: React.Dispatch<React.SetStateAction<boolean | null>>;
  sort: SortOrderEnum;
  setSort: React.Dispatch<React.SetStateAction<SortOrderEnum>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
