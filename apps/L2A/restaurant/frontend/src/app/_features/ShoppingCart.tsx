export const ShoppingCart = () => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl p-4">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Захиалгын түүх</h2>
      </div>
      <div className="p-4 space-y-2">
        {['42,800₮', '27,450₮', '18,900₮', '21,900₮', '24,200₮', '19,750₮'].map((price, index) => (
          <div key={index} className="p-3 bg-white rounded-lg flex justify-between items-center border">
            <div>
              <p className="text-sm text-gray-700">#33998</p>
              <span className="text-xs text-black border px-2 py-1 rounded-full">Дууссан</span>
              <p className="text-xs text-gray-500">24.10.19 15:25</p>
            </div>
            <div className="text-xl font-semibold">{price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};