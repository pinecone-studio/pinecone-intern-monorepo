const FilterByToday = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="border border-[#D6D8DB] border-solid text-black h-30 rounded-md hover:bg-black hover:text-white" style={{ padding: 'revert' }} onClick={onClick} data-testid="filter-by-today">
      Өнөөдөр
    </button>
  );
};

export default FilterByToday;
