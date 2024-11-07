const sizes = ['S', 'M', 'L', 'XL', '2XL'];

type SizeSelectorProps = {
  selectedSize: string | null;
  setSelectedSize: (_size: string) => void;
};

const SizeSelector = ({ selectedSize, setSelectedSize }: SizeSelectorProps) => (
  <div className="flex gap-2">
    {sizes.map((size) => (
      <button key={size} className={`border rounded-full px-4 py-2.5 ${selectedSize === size ? 'bg-black text-white' : ''}`} onClick={() => setSelectedSize(size)}>
        {size}
      </button>
    ))}
  </div>
);

export default SizeSelector;
