import DeleteUpdateDialog from './DeleteUpdateDialog';
import categories from '../_components/category.json';

const MenuList = () => {
  return (
    <div data-cy="food-card" className="w-[515px] flex flex-col">
      <div data-cy="food" className="flex flex-col w-[536px]">
        {categories.map((category) => (
          <div data-cy="category-buttons" key={category.id} className="flex justify-between px-3 py-5 text-[16px] border-b" onClick={() => category.id}>
            {category.name}
            <DeleteUpdateDialog />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;