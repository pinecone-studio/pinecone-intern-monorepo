import { Category } from '@/generated';
type CategorySelectInputProps = {
  loading: boolean;
  categories: [Category] | undefined;
};
export const CategorySelectInput = ({ categories, loading }: CategorySelectInputProps) => {
  return (
    <select data-testid="category-select-input-select-button" defaultValue="" className="select select-bordered w-full  text-black-primary invalid:text-textPlaceholder" required>
      {loading && <option>Loading...</option>}

      <option value="" disabled>
        Ангилал сонгох
      </option>
      {categories?.map((item) => {
        return (
          <option data-testid={`categories-option-${item.id}`} key={item.id} value={item.id}>
            {item.name}
          </option>
        );
      })}
    </select>
  );
};
