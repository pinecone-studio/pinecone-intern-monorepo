const SearchNoResult = ({loading, error, searchName} :{loading: any, error: any, searchName: string}) => {
  return <>{!loading && !error && searchName && <p>No users found.</p>}</>;
};

export default SearchNoResult;
