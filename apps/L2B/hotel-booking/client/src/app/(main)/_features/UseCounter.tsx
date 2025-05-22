import { useState } from 'react';

const useCounter = (initialValue = 1, min = 1) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(min, prev - 1));

  return { count, increment, decrement };
};

export default useCounter;
