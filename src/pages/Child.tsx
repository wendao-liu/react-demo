import React, { useEffect, memo } from 'react';
const Child = ({ topChildren, onClick }) => {
  console.log('Child-update');

  return (
    <span>
      <span onClick={onClick}>Child</span>
      {topChildren}
    </span>
  );
};
// export default Child;
export default memo(Child);
