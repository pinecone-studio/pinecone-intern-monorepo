'use caent';
export default function DashboardTable() {
  return (
    <div className=" bg-white font-grey-800 overflow-x-auto border border-gray-200 rounded-md w-3/4" data-testid="dashboard-table">
      <table className="w-full text-sm text-left whitespace-nowrap">
        <thead className="">
          <tr>
            <th className="p-3 font-medium">Онцлох</th>
            <th className="p-3 font-medium">Тоглолтын нэр</th>
            <th className="p-3 font-medium">Артист</th>
            <th className="p-3 font-medium">
              Нийт тоо: <a>900</a>
            </th>
            <th className="p-3 font-medium">
              VIP: <a>300</a>
            </th>
            <th className="p-3 font-medium">
              Regular:
              <a> 300</a>
            </th>
            <th className="p-3 font-medium">
              Задгай:
              <a>300</a>
            </th>
            <th className="p-3 font-medium">Тоглох өдрүүд</th>
            <th className="p-3 font-medium">Нийт ашиг</th>
            <th className="p-3 font-medium">Үйлдэл</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
