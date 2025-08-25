const SearchNoResult = ({loading, error, searchName} :{loading: any, error: any, searchName: string}) => {
  return <>{!loading && !error && searchName && <div data-testid="no-result">No Result</div>}</>;
};

export default SearchNoResult;
