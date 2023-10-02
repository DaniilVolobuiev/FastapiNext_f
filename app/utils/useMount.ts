import { useEffect, useState } from 'react';

import { ANIMATION_TIME } from './../constants/index';
type qwet = {
  opened: boolean;
};
export const useMount = ({ opened }: qwet) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted && opened) {
      setMounted(true);
    } else if (!opened && mounted) {
      setTimeout(() => {
        setMounted(false);
      }, ANIMATION_TIME);
    }
  }, [opened]);

  return {
    mounted,
  };
};
