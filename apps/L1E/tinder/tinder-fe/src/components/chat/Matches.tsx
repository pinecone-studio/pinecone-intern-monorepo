import { useGetMatchedUsersQuery } from '@/generated';

const Matches = () => {
  const authId = JSON.parse(localStorage.getItem('user') || '{}')._id || '';

  const { data, loading } = useGetMatchedUsersQuery({
    variables: { authId },
    skip: !authId,
  });

  const matches = data?.getMatchedUsers;

  return (
    <div className="w-screen flex flex-col justify-center items-center pt-14 bg-transparent">
      <div className="max-w-[1180px] flex-col w-screen max-h-[160px] pt-6 h-screen flex gap-2">
        <div className="items-start">
          <h2>Matches</h2>
          <div className="flex gap-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              matches?.map((match) => (
                <div key={match._id}>
                  <div className="flex flex-col pt-2 items-center justify-center gap-1">
                    <img src={match.targetUserId.images[0]} alt="User Image" className="w-10 h-10 rounded-full" />
                    <div className="text-sm flex">
                      <div>{match.targetUserId.username}</div>
                      <div>, {match.targetUserId.age}</div>
                    </div>
                    <div>{match.targetUserId.profession}</div>
                  </div>
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
