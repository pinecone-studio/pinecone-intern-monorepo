const SearchResponse = ({loading, error}: {loading: any, error: any}) => {
  return (
    <div data-testid="search-response">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
};

export default SearchResponse;
