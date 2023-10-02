import axios from './axios';
import { ICreateTodo, IGetAllTodos } from './types';

export const createTodo = async (todoData: ICreateTodo) => {
  try {
    const response = await axios.post('todos', {
      ...todoData,
      completed: false,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllTodos = async (params: IGetAllTodos) => {
  try {
    const response = await axios.get('todos', { params: params });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTodo = async (todoId: number) => {
  try {
    await axios.delete(`todos/${todoId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const upgradeTodo = async (todoId: number, completed: boolean) => {
  try {
    await axios.put(`todos/${todoId}`, {
      completed: completed,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
