interface ListItemPropsCategory {
  name: string;
  grade: number;
  desc: string;
}
interface ListItemProps {
  name: string;
  category: ListItemPropsCategory[];
}
export const List: React.FC<ListItemProps[]> = (props) => {
  const items = props;
  return (
    <div className="w-screen">
      <table className="table table-lg table-zebra bg-black border-collapse border-2 border-solid border-black" width="100%">
        {/* head */}
        <thead>
          <tr className="*:border-2 *:border-solid *:border-black *:border-collapse border-collapse border-">
            <th>№</th>
            <th>Овог нэр</th>
            <th>Сэдэв</th>
            <th>Тэмдэглэл</th>
            <th>Үнэлгээ</th>
            <th>Ирц</th>
            <th>Төлөв</th>
          </tr>
        </thead>
        <tbody className="h-1/2">
          {/* row 1 */}
          {items.map((item: ListItemProps, index: number) => (
            <>
              <tr className="flex text-center">
                <th rowSpan={item.category.length} className="border">
                  {index + 1}
                </th>
                <th rowSpan={item.category.length}>{item.name}</th>
                <td className="text-center">{item.category[0].name}</td>
                <td className="">
                  <textarea className="textarea textarea-bordered" defaultValue={item.category[0].desc}></textarea>
                </td>
                <td>
                  <input type="number" className="grow input" placeholder="0" defaultValue={item.category[0].grade} max={100} min={0} />
                </td>
                <td className="block m-auto">
                  <h1>5/12</h1>
                  <select className="select select-bordered w-full max-w-xs" defaultValue={'PRESENT'}>
                    <option value="PRESENT">PRESENT</option>
                    <option value="ABSENT">ABSENT</option>
                    <option value="LATE">LATE</option>
                    <option value="EXCUSED">EXCUSED</option>
                    <option value="SICK">SICK</option>
                  </select>
                </td>
                <td>
                  <input type="checkbox" className="checkbox" />
                </td>
              </tr>
              {item.category.slice(1).map((item: ListItemPropsCategory, index: number) => (
                <tr key={index}>
                  <td className="text-center">{item.name}</td>
                  <td className="">
                    <textarea className="textarea textarea-bordered" defaultValue={item.desc}></textarea>
                  </td>
                  <td>
                    <input type="number" className="grow input" placeholder="0" defaultValue={item.grade} max={100} min={0} />
                  </td>
                  <td className="block m-auto">
                    <h1>5/12</h1>
                    <select className="select select-bordered w-full max-w-xs" defaultValue={'PRESENT'}>
                      <option value="PRESENT">PRESENT</option>
                      <option value="ABSENT">ABSENT</option>
                      <option value="LATE">LATE</option>
                      <option value="EXCUSED">EXCUSED</option>
                      <option value="SICK">SICK</option>
                    </select>
                  </td>
                  <td className="block m-auto">
                    <input type="checkbox" className="checkbox" />
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};
