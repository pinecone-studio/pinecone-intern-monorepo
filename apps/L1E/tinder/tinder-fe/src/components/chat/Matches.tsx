import { useGetMatchedUsersQuery, useGetUserByIdQuery } from '@/generated';
import { useEffect, useState } from 'react';

const Matches = () => {
  const [matches, setMatches] = useState<Array<{ _id: string; targetUserId: string; targetUserDetails?: any }>>([]);
  const [loading, setLoading] = useState(true);

  const authId = JSON.parse(localStorage.getItem('user') || '{}')._id || '';

  const { data } = useGetMatchedUsersQuery({
    variables: { authId },
    skip: !authId,
  });

  useEffect(() => {
    if (data?.getMatchedUsers) {
      setMatches(data.getMatchedUsers);
      setLoading(false);
    }
  }, [data]);

  const { data: userDetailsData } = useGetUserByIdQuery({
    variables: { userId: matches[0]?.targetUserId },
    skip: matches.length === 0,
  });

  useEffect(() => {
    setMatches((prevMatches) =>
      prevMatches.map((match) => ({
        ...match,
        targetUserDetails: userDetailsData?.getUserById,
      }))
    );
  }, [userDetailsData]);

  return (
    <div className="w-screen flex flex-col justify-center items-center pt-14 bg-transparent">
      <div className="max-w-[1180px] flex-col w-screen max-h-[160px] pt-6 h-screen flex gap-2">
        <div className="items-start">
          <h2>Matches</h2>
          <div className="flex gap-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              matches.map((match) => (
                <div key={match._id}>
                  {match.targetUserDetails && (
                    <div className="flex flex-col pt-2 items-center justify-center gap-1">
                      {match.targetUserDetails.images && match.targetUserDetails.images[0] && <img src={match.targetUserDetails.images[0]} alt="User Image" className="w-10 h-10 rounded-full" />}
                      <div className="text-sm flex">
                        <div>{match.targetUserDetails.username}</div>
                        <div>, {match.targetUserDetails.age}</div>
                      </div>
                      <div>{match.targetUserDetails.profession}</div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matches;
