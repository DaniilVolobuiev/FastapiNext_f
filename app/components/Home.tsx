import React from 'react';
import { CreateTodoPopup } from './CreateTodoPopup';
import Header from './Header';
import TodoItem from './TodoItem';
import { TodoContext } from '../context';

const Home = () => {
  const [opened, setOpened] = React.useState<boolean>(false);

  const { todos } = React.useContext(TodoContext);

  return (
    <>
      <CreateTodoPopup opened={opened} setOpened={setOpened} />
      <Header setOpened={setOpened} />
      <div className="p-10">
        {todos
          ? todos.map((obj) => (
              <div>
                <TodoItem
                  id={obj.id}
                  title={obj.title}
                  completed={obj.completed}
                  priority={obj.priority}
                />
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default Home;
