"use client";

import { useGetOthersProfileLazyQuery } from "@/generated";
import { Search } from "lucide-react";
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
    <div className="flex flex-col gap-5 w-[410px] px-4 mx-auto">
      <h3 className="items-start font-semibold text-2xl">Search</h3>
      <div>
        <div className="flex items-center gap-2 p-3 bg-white text-[#71717A]">
          <Search strokeWidth={1} size={16} />
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search..."
            className="rounded p-2 w-full outline-none focus:border-none placeholder:text-[#71717A] placeholder:text-sm"
          />
        </div>
        <hr className="py-4"></hr>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-base">Recent</h1>
            <h6 className="font-medium text-sm text-[#2563EB]">Clear all</h6>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {error.message}</p>}

          {!loading && !error && data?.getProfiles?.length ? (
            <div>
              {data.getProfiles.map((user) => (
                <a href={`/${user.userName}`}>
                  <div key={user.userName} className="flex gap-2 items-center">
                    <img src={`/${user.profileImage}`} className="w-[44px] h-[44px] rounded-full"></img>
                   <div>
                     <p className="font-medium text-sm">{user.userName}</p>
                     <p className="font-medium text-xs">{user.bio}</p>
                   </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            !loading && !error && searchName && <p>No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
