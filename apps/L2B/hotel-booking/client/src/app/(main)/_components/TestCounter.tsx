// components/CounterTestComponent.jsx
import React from 'react';
import useCounter from '../_components/UseCounter';

const TestCounter = () => {
  const { count, increment, decrement } = useCounter(1, 1);

  return (
    <div>
      <h1 data-testid="count">{count}</h1>
      <button data-testid="increment" onClick={increment}>
        Increment
      </button>
      <button data-testid="decrement" onClick={decrement}>
        Decrement
      </button>
    </div>
  );
};

export default TestCounter;
