interface FilterByTodayProps {
  handleTodayButtonClick: () => void;
}
 
const FilterByToday = ({ handleTodayButtonClick }: FilterByTodayProps) => {
  return (
    <button className="border border-[#D6D8DB] border-solid text-black h-30 rounded-md hover:bg-black hover:text-white" style={{ padding: 'revert' }} onClick={handleTodayButtonClick}>
      Өнөөдөр
    </button>
  );
};
 
export default FilterByToday;