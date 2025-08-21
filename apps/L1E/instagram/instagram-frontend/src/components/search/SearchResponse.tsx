const SearchResponse = ({loading, error}: {loading: any, error: any}) => {
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </>
  );
};

export default SearchResponse;
