// components/CounterTestComponent.jsx
import React from 'react';
import useCounter from '../_features/UseCounter';

const CounterTestComponent = () => {
  const { count, increment, decrement } = useCounter(1, 1);

  return (
    <div>
      <h1 data-cy="count">{count}</h1>
      <button data-cy="increment" onClick={increment}>
        Increment
      </button>
      <button data-cy="decrement" onClick={decrement}>
        Decrement
      </button>
    </div>
  );
};

export default CounterTestComponent;
