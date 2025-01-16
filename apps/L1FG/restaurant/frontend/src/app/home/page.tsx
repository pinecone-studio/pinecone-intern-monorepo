import FoodCard from '@/components/common/FoodCard';
import FooterButton from '@/components/common/FooterButton';
import Header from '@/components/common/Header';

const categories = ['Үндсэн хоол', 'Цай, кофе', 'Ус, ундаа', 'Амттан', 'Шинэ / 20%', 'Улиралын'];
const foodItems = [
  { price: 15.6, title: 'Taco', img: '/Taco.png' },
  { price: 15.6, title: 'Burger', img: '/Taco.png' },
  { price: 15.6, title: 'Taco', img: '/Taco.png' },
  { price: 15.6, title: 'Burger', img: '/Taco.png' },
  { price: 15.6, title: 'Taco', img: '/Taco.png' },
  { price: 15.6, title: 'Burger', img: '/Taco.png' },
];

const Home = () => {
  return (
    <div className="flex flex-col w-screen items-center mx-auto min-h-screen">
      <Header />
      <div className="fixed top-[42px] flex justify-center items-center flex-col bg-white">
        <p className="font-semibold text-xl text-[#441500]">Хоолны цэс</p>
        <div className="w-screen overflow-scroll px-4">
          <div className="w-fit flex ">
            {categories.map((category, index) => {
              return (
                <button key={index} className="w-32 rounded-md hover:bg-gray-100 py-2 px-4">
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-center items-center gap-4 my-20">
        {foodItems.map((foodItem, index) => {
          return <FoodCard price={foodItem.price} title={foodItem.title} img={foodItem.img} key={index} />;
        })}
      </div>
      <FooterButton />
    </div>
  );
};
export default Home;
