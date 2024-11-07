type QuantityControlProps = {
  count: number;
  setCount: (_count: number) => void;
};

const QuantityControl = ({ count, setCount }: QuantityControlProps) => {
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 1 ? count - 1 : 1);

  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="cursor-pointer border border-black w-8 h-8 justify-center flex items-center rounded-full" onClick={decrement}>
        <p>-</p>
      </div>
      <div>{count}</div>
      <div className="cursor-pointer border border-black w-8 h-8 justify-center flex items-center rounded-full" onClick={increment}>
        <p>+</p>
      </div>
    </div>
  );
};

export default QuantityControl;
