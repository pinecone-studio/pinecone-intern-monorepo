import Image from 'next/image';

export const ConcertsList = () => {
  const concertData = [
    {
      id: 1,
      image: 'https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg',
      title: 'Music of the Spheres',
      artist: 'Coldplay',
      price: "200'000$",
      date: '10.31-11.2',
      location: 'UG ARENA',
    },
    {
      id: 2,
      image: 'https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg',
      title: 'Ocean Beats',
      artist: 'DJ Wave',
      price: "120'000$",
      date: '9.12-9.13',
      location: 'Blue Dome',
    },
    {
      id: 3,
      image: 'https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg',
      title: 'Night Lights',
      artist: 'Imagine Dragons',
      price: "180'000$",
      date: '11.10-11.12',
      location: 'UB Palace',
    },
    {
      id: 4,
      image: 'https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg',
      title: 'Bass Drop',
      artist: 'Skrillex',
      price: "250'000$",
      date: '10.01-10.03',
      location: 'Sound Hall',
    },
    {
      id: 5,
      image: 'https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg',
      title: 'Rock Revival',
      artist: 'Green Day',
      price: "300'000$",
      date: '12.20-12.22',
      location: 'Big Arena',
    },
    {
      id: 6,
      image: 'https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg',
      title: 'Classical Night',
      artist: 'Beethoven Lives',
      price: "150'000$",
      date: '10.15-10.16',
      location: 'Opera House',
    },
    // {
    //     id: 7,
    //     image: "https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg",
    //     title: "Jazz & Wine",
    //     artist: "Miles Quartet",
    //     price: "140'000$",
    //     date: "9.25-9.26",
    //     location: "Jazz Lounge",
    // },
    // {
    //     id: 8,
    //     image: "https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg",
    //     title: "K-Pop Wave",
    //     artist: "BTS",
    //     price: "500'000$",
    //     date: "11.01-11.02",
    //     location: "Seoul Dome",
    // },
    // {
    //     id: 9,
    //     image: "https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg",
    //     title: "Indie Vibes",
    //     artist: "Arctic Monkeys",
    //     price: "220'000$",
    //     date: "10.10-10.12",
    //     location: "Underground Stage",
    // },
  ];

  return (
    <>
      <h6 className="text-white text-xl font-light mb-6">Холбоотой эвент болон тоглолтууд</h6>
      <div className="w-full grid gap-8 grid-cols-3 grid-rows-2 [&>*]:w-full [&>*]:h-fit">
        {concertData.map((concert) => (
          <div key={concert.id}>
            <Image src="https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg" className="h-4/6 w-full object-cover object-center" alt="img" width={100} height={100} />

            <div className="py-8 px-6 bg-[#131313] rounded">
              <h2 className="text-white text-xl font-normal">{concert.title}</h2>
              <p className="text-[#A1A1AA] text-base font-light mb-7">{concert.artist}</p>
              <p className="text-white text-2xl font-bold mb-6">{concert.price}</p>
              <div className="flex justify-between">
                <div className="text-[#A1A1AA] flex gap-2 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M10.6667 1.3335V4.00016M5.33333 1.3335V4.00016M2 6.66683H14M3.33333 2.66683H12.6667C13.403 2.66683 14 3.26378 14 4.00016V13.3335C14 14.0699 13.403 14.6668 12.6667 14.6668H3.33333C2.59695 14.6668 2 14.0699 2 13.3335V4.00016C2 3.26378 2.59695 2.66683 3.33333 2.66683Z"
                      stroke="#FAFAFA"
                      strokeOpacity="0.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>10.31-11.2</span>
                </div>

                <div className="text-[#A1A1AA] flex gap-2 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path
                      d="M13.6667 6.66683C13.6667 10.6668 8.33339 14.6668 8.33339 14.6668C8.33339 14.6668 3.00006 10.6668 3.00006 6.66683C3.00006 5.25234 3.56196 3.89579 4.56216 2.89559C5.56235 1.8954 6.91891 1.3335 8.33339 1.3335C9.74788 1.3335 11.1044 1.8954 12.1046 2.89559C13.1048 3.89579 13.6667 5.25234 13.6667 6.66683Z"
                      stroke="#FAFAFA"
                      strokeOpacity="0.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.33339 8.66683C9.43796 8.66683 10.3334 7.7714 10.3334 6.66683C10.3334 5.56226 9.43796 4.66683 8.33339 4.66683C7.22882 4.66683 6.33339 5.56226 6.33339 6.66683C6.33339 7.7714 7.22882 8.66683 8.33339 8.66683Z"
                      stroke="#FAFAFA"
                      strokeOpacity="0.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>UG ARENA</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
