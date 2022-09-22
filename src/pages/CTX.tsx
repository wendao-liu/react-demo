import React, { useEffect, memo, useContext } from 'react';
import { StoreContext } from './store/Provider';

const CTX = () => {
  console.log('CTX-update');
  const { count } = useContext(StoreContext);

  return (
    <span>
      <span>CTX: {count?.a}</span>
    </span>
  );
};
export default memo(CTX);
// export default CTX;
