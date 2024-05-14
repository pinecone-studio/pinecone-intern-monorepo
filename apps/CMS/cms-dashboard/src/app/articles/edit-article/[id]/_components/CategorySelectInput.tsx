import { EDIT_INPUT_PROPS } from './common';

export const CategorySelectInput = (props: EDIT_INPUT_PROPS) => {
  const { loading, categories, name, value, onChange, onBlur, defaultValue } = props;

  return (
    <>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={defaultValue}
        className="select select-bordered w-full  text-black-primary invalid:text-textPlaceholder"
        data-testid="category-select-input-select-button"
        data-cy="category-select-input-select-button-cy-id"
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
