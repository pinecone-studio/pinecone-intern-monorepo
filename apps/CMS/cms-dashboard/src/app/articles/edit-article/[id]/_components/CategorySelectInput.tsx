import { Category } from '@/generated';
import { CategorySelectInputFeatureProps } from '../_feature/CategorySelectInputFeature';
type PropsType = {
  loading: boolean;
  categories: [Category] | undefined;
} & CategorySelectInputFeatureProps;
export const CategorySelectInput = (props: PropsType) => {
  const { loading, categories, name, value, onChange, onBlur, defaultValue } = props;

  return (
    <>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={value ?? defaultValue}
        className="select select-bordered w-full  text-black-primary invalid:text-textPlaceholder"
        data-testid="category-select-input-select-button"
      >
        {loading && <option>Loading...</option>}
        {categories?.map((item, index) => {
          return (
            <option data-testid={`categories-option-${index}`} key={item.id} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </>
  );
};
