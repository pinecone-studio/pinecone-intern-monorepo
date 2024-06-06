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
    <div className="w-[90vw]">
      <table className="table table-lg w-full">
        {/* head */}
        <thead>
          <tr className="">
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
              <tr key={index} className="*:border-2 *:border-solid *:border-white">
                <th rowSpan={item.category.length}>{index + 1}</th>
                <th rowSpan={item.category.length}>{item.name}</th>
                <td className="">{item.category[0].name}</td>
                <td className="">
                  <textarea className="textarea textarea-bordered w-full" defaultValue={item.category[0].desc}></textarea>
                </td>
                <td>
                  <input type="number" className="grow input" placeholder="0" defaultValue={item.category[0].grade} max={100} min={0} />
                </td>

                <td>
                  <input type="checkbox" className="checkbox" />
                </td>
              </tr>
              {item.category.slice(1).map((item: ListItemPropsCategory, index: number) => (
                <tr key={'cat' + index} className="*:border-2 *:border-solid *:border-white *:border-collapse">
                  <td className="">{item.name}</td>
                  <td className="">
                    <textarea className="textarea textarea-bordered w-full" defaultValue={item.desc}></textarea>
                  </td>
                  <td>
                    <input type="number" className="grow input" placeholder="0" defaultValue={item.grade} max={100} min={0} />
                  </td>

                  <td className="">
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
