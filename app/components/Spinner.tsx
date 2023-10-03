import { Hourglass } from 'react-loader-spinner';

import React from 'react';

const Spinner = () => {
  return (
    <Hourglass
      visible={true}
      height="200"
      width="200"
      ariaLabel="hourglass-loading"
      wrapperStyle={{}}
      wrapperClass=""
      colors={['#306cce', '#72a1ed']}
    />
  );
};

export default Spinner;
