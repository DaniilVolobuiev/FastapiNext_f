import styles from './popup.module.scss';
import { toast } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';
import React from 'react';
import { PopupProps } from '..';
import animationStyles from './animationStyles.module.scss';

import { ANIMATION_TIME, PRIORITY_SELECTION } from './../../../constants/index';
import { createTodo } from '@/app/requests';
import { TodoContext } from '@/app/context';
import { PriorityType } from '@/app/types';
import useFetchTodos from '@/app/utils/useFetchData';

const overlayAnimation = {
  enter: animationStyles.overlayEnter,
  enterActive: animationStyles.overlayEnterActive,
  exit: animationStyles.overlayExit,
  exitActive: animationStyles.overlayExitActive,
};
const contentAnimation = {
  enter: animationStyles.contentEnter,
  enterActive: animationStyles.contentEnterActive,
  exit: animationStyles.contentExit,
  exitActive: animationStyles.contentExitActive,
};

export const Layout: React.FC<PopupProps> = ({ opened, setOpened }) => {
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [animationIn, setAnimationIn] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [priority, setPriority] = React.useState<PriorityType>(1);

  const { searchString, sort, filter } = React.useContext(TodoContext);

  const fetchData = useFetchTodos();

  React.useEffect(() => {
    setAnimationIn(opened);
  }, [opened]);

  const handlePriorityClick = (value: PriorityType) => {
    setPriority(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await createTodo({ title, priority });
      await fetchData(searchString, sort, filter);
      setOpened(false);
    } catch (error) {
      toast('Todo creation failed');
    }
  };

  return (
    <div className={styles.container}>
      <CSSTransition
        in={animationIn}
        nodeRef={overlayRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={overlayAnimation}>
        <div ref={overlayRef} className={styles.overlay} onClick={() => setOpened(false)}></div>
      </CSSTransition>
      <CSSTransition
        in={animationIn}
        nodeRef={contentRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={contentAnimation}>
        <div ref={contentRef} className={styles.content}>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 font-semibold">Todo Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-2 py-1 border rounded mb-4"
            />
            <div className="flex gap-2 flex-col justify-between mb-4">
              <label className="font-semibold">Priority:</label>
              <div className="flex space-x-2">
                {PRIORITY_SELECTION.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`px-4 py-2 border rounded ${
                      priority === value ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                    }`}
                    onClick={() => handlePriorityClick(value as PriorityType)}>
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
              Create Todo
            </button>
          </form>
        </div>
      </CSSTransition>
    </div>
  );
};
