import DeleteUpdateDialog from './DeleteUpdateDialog';
import discount from '../_components/discount.json';

const DiscountList = () => {
  return (
    <div data-cy="food-card" className="w-[515px] flex flex-col">
      <div data-cy="food" className="flex flex-col w-[536px]">
        {discount.map((category) => (
          <div data-cy="category-buttons" key={category.id} className="flex justify-between px-3 py-5 text-[16px] border-b" onClick={() => category.id}>
            <div className="flex gap-2">
              <p>{category.name} /</p>
              <p className="font-semibold">{category.percent}%</p>
              <p>{category.time}</p>
            </div>
            <DeleteUpdateDialog />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountList;