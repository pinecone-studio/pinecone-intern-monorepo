const profileSuggestions = [
  {
    id: '1',
    username: 'CarolBaskin',
    name: 'Carol Baskin',
    avatar: 'https://via.placeholder.com/64',
  },
  {
    id: '2',
    username: 'bibi_lovely',
    name: 'Bibi',
    avatar: 'https://via.placeholder.com/64',
  },
  {
    id: '3',
    username: 'Cato1909',
    name: 'Cato Vincent',
    avatar: 'https://via.placeholder.com/64',
  },
  {
    id: '4',
    username: 'ElizabethSuescate',
    name: 'Elizabeth',
    avatar: 'https://via.placeholder.com/64',
  },
  {
    id: '5',
    username: '_vikky_',
    name: 'Victoria J.',
    avatar: 'https://via.placeholder.com/64',
  },
];

const ProfileSuggestionCard = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {profileSuggestions.map((profile) => (
        <div key={profile.id} className="border rounded-lg shadow-sm p-4 flex flex-col items-center text-center w-52 relative">
          <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 p-1">×</button>
          <div className="flex flex-col items-center w-full mb-2">
            <img src={profile.avatar} alt={profile.username} className="w-[54px] h-[54px] rounded-full" />
          </div>
          <p className="text-sm leading-5 font-normal text-black">{profile.username}</p>
          <p className="text-sm leading-4 font-normal text-gray-500">{profile.name}</p>
          <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg">Follow</button>
        </div>
      ))}
    </div>
  );
};

export default ProfileSuggestionCard;
