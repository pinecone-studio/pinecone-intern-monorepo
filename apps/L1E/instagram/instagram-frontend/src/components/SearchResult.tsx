"use client";

import { useGetOthersProfileLazyQuery } from "@/generated";
import { useEffect, useState } from "react";

const SearchResults = () => {
  const [searchName, setSearchName] = useState("");
  const [getProfiles, { data, loading, error }] = useGetOthersProfileLazyQuery();

  useEffect(() => {
    if (searchName.trim()) {
      getProfiles({ variables: { userName: searchName } });
    }
  }, [searchName, getProfiles]);


  return (
    <div className="flex flex-col justify-center items-center border border-gray-200 w-fit mx-auto p-4">
      <input
        type="text"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder="Search username..."
        className="border p-2 rounded mb-4"
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      {!loading && !error && data?.getProfiles?.length ? (
        <ul>
          {data.getProfiles.map((user) => (
           <a href={`/${user.userName}`}>
            <div key={user.userName}>
              <p>{user.userName}</p>
            </div>
           </a>
          ))}
        </ul>
      ) : (
        !loading && !error && <p>No users found.</p>
      )}
    </div>
  );
};

export default SearchResults;
