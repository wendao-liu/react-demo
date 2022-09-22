import { useMemo, useState, useCallback } from 'react';
import Child from './Child';
import CTX from './CTX';
import { StoreProvider } from './store/Provider';
export default function IndexPage() {
  const [count, setCount] = useState({ a: 0 });
  const [sum, setSum] = useState(0);

  const ctxValue = useMemo(() => ({ count }), [count]);
  const TopChildren = () => {
    console.log('TopChildren: update');
    return <div>TopChildren</div>;
  };
  const topChildren = useMemo(() => <TopChildren />, [count]);

  const handleClick = () => {
    console.log('handleClick: update');
  };
  const handleClickMemo = useCallback(handleClick, []);

  const Test = () => {
    console.log('Test: update');
    return <div>Test</div>;
  };
  return (
    <>
      <div>
        <StoreProvider store={ctxValue}>
        {/* <StoreProvider store={{ count }}> */}
          <span>count:{count?.a}</span>
          <div></div>
          <span>sum:{sum}</span>
          <div></div>
          <CTX></CTX>
          <div></div>
          {/* <Child topChildren={TopChildren}></Child> */}
          {/* <Child topChildren={TopChildren} onClick={handleClick}></Child> */}
          <Child topChildren={topChildren} onClick={handleClickMemo}></Child>
          <div></div>
        </StoreProvider>
        <Test></Test>

        <button
          onClick={() => {
            setCount({ a: count.a + 1 });
          }}
        >
          count+
        </button>
        <button
          onClick={() => {
            setSum(sum + 1);
          }}
        >
          sum-
        </button>
      </div>
    </>
  );
}
