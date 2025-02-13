type User = {
  username: string;
  relationship: string;
  avatar: string;
};

const users: User[] = [
  { username: 'lmkir', relationship: 'Follows you', avatar: 'https://via.placeholder.com/40' },
  { username: 'bayleif', relationship: 'Followed by apateu', avatar: 'https://via.placeholder.com/40' },
  { username: 'wiffa890', relationship: 'Followed by apateu', avatar: 'https://via.placeholder.com/40' },
  { username: 'ghastly_dolls', relationship: 'Follows you', avatar: 'https://via.placeholder.com/40' },
  { username: 'n3g4t1v3_Sp4c3', relationship: 'Follows defavours', avatar: 'https://via.placeholder.com/40' },
];

const FooterLinks = ['About', 'Help', 'Press', 'API', 'Jobs', 'Privacy', 'Terms', 'Locations', 'Language', 'Meta Verified'];

const HomeSuggestionCard = () => {
  return (
    <div className="mx-auto p-4 text-sm text-gray-500">
      <ul className="space-y-4">
        {users.map((user, index) => (
          <li key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-medium text-black">{user.username}</p>
                <p className="text-xs text-gray-400">{user.relationship}</p>
              </div>
            </div>
            <button className="text-blue-500 font-medium hover:underline">Follow</button>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-xs leading-4 font-normal text-gray-500">
        <ul className="flex flex-wrap gap-2 justify-center">
          {FooterLinks.map((link, index) => (
            <li key={index} className="hover:underline cursor-pointer">
              {link}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-4 font-normal text-gray-500">© 2024 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
};

export default HomeSuggestionCard;
