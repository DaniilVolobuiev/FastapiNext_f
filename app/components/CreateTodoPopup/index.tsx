import { useMount } from '../../utils/useMount';

import React from 'react';

import { Layout } from './layout';

export type PopupProps = {
  opened: boolean;
  setOpened: (value: boolean) => void;
};

export const CreateTodoPopup: React.FC<PopupProps> = ({ opened, setOpened }) => {
  const { mounted } = useMount({ opened });

  if (!mounted) {
    return null;
  }
  return <Layout setOpened={setOpened} opened={opened} />;
};
