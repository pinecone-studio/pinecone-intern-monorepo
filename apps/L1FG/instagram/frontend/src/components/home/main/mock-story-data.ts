export interface StoryUser {
  id: number;
  username: string;
  profileImage: string;
  storyViewed: boolean;
  lastUpdated: string;
  isVerified: boolean;
  followerCount: number;
  bio: string;
}

export type StoryData = StoryUser[];

export const mockStoryData: StoryData = [
  {
    id: 1,
    username: 'emma_wilson',
    profileImage: 'https://assets.entrepreneur.com/content/3x2/2000/20150406145944-dos-donts-taking-perfect-linkedin-profile-picture-selfie-mobile-camera-2.jpeg',
    storyViewed: false,
    lastUpdated: '2024-01-16T08:30:00Z',
    isVerified: true,
    followerCount: 12500,
    bio: 'Travel photographer | Adventure seeker',
  },
  {
    id: 2,
    username: 'kim_k',
    // eslint-disable-next-line no-secrets/no-secrets
    profileImage: 'https://parade.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MjEyMDA1MzQxNTIzNjE3NzY4/kim-kardashian-unhinged-ig-post-los-angeles-fires-jan-2025-ftr.png',
    storyViewed: true,
    lastUpdated: '2024-01-16T09:15:00Z',
    isVerified: false,
    followerCount: 8900,
    bio: 'Digital artist | Coffee enthusiast',
  },
  {
    id: 3,
    username: 'hoyyinnn',
    // eslint-disable-next-line no-secrets/no-secrets
    profileImage: 'https://img.buzzfeed.com/buzzfeed-static/static/2022-05/17/19/enhanced/0ed428cc0aca/enhanced-2137-1652814476-10.jpg?crop=540:386;17,10&output-format=jpg&output-quality=auto',
    storyViewed: false,
    lastUpdated: '2024-01-16T10:00:00Z',
    isVerified: true,
    followerCount: 25600,
    bio: 'Professional photographer 📸',
  },
  {
    id: 4,
    username: 'zend99aya',
    // eslint-disable-next-line no-secrets/no-secrets
    profileImage: 'https://www.stylerave.com/wp-content/uploads/2023/08/1000-x-1000-16.png',
    storyViewed: false,
    lastUpdated: '2024-01-16T07:45:00Z',
    isVerified: false,
    followerCount: 5200,
    bio: 'Code. Create. Repeat. 💻',
  },
  {
    id: 5,
    username: 'selena_gomee',
    profileImage: 'https://katiecouric.com/wp-content/uploads/2023/04/sephoraselena.jpeg',
    storyViewed: true,
    lastUpdated: '2024-01-16T11:20:00Z',
    isVerified: true,
    followerCount: 18700,
    bio: 'UI/UX Designer | Art lover',
  },
  {
    id: 6,
    username: 'david_tech',
    // eslint-disable-next-line no-secrets/no-secrets
    profileImage: 'https://i2-prod.rsvplive.ie/incoming/article34085682.ece/ALTERNATES/s615/0_Tulisa-Contostavlos.png',
    storyViewed: false,
    lastUpdated: '2024-01-16T12:00:00Z',
    isVerified: false,
    followerCount: 7300,
    bio: 'Tech reviewer | Gadget geek 🤓',
  },
  {
    id: 7,
    username: 'nicki.minaj',
    // eslint-disable-next-line no-secrets/no-secrets
    profileImage: 'https://www.mercurynews.com/wp-content/uploads/2016/08/20120925_013710_celebs-main.jpg?w=409',
    storyViewed: true,
    lastUpdated: '2024-01-16T08:00:00Z',
    isVerified: true,
    followerCount: 31200,
    bio: 'Digital art & illustrations ✨',
  },
  {
    id: 8,
    username: 'joliena',
    profileImage: 'https://www.thefamouspeople.com/profiles/thumbs/angelina-jolie-5.jpg',
    storyViewed: false,
    lastUpdated: '2024-01-16T09:45:00Z',
    isVerified: false,
    followerCount: 15400,
    bio: 'Fitness coach | Lifestyle 💪',
  },
];
