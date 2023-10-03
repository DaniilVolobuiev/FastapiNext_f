import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreateTodoPopup } from './CreateTodoPopup';
import Header from './Header';
import TodoItem from './TodoItem';
import { TodoContext } from '../context';
import { ITodoContext } from '../types';
import Spinner from './Spinner';

const Home = () => {
  const [opened, setOpened] = React.useState<boolean>(false);

  const { todos, loading } = React.useContext<ITodoContext>(TodoContext);

  return (
    <>
      <CreateTodoPopup opened={opened} setOpened={setOpened} />
      <Header setOpened={setOpened} />
      <div className="p-10">
        {loading || !todos ? (
          <div className="flex justify-center items-center h-screen">
            <Spinner />
          </div>
        ) : (
          todos.map((obj) => (
            <TodoItem
              key={obj.id}
              id={obj.id}
              title={obj.title}
              completed={obj.completed}
              priority={obj.priority}
            />
          ))
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default Home;
