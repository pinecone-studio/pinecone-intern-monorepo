interface ListItemPropsCategory {
  name: string;
  grade: number;
  desc: string;
}
interface ListDayProps {
  name: string;
  status: string;
}
interface ListItemProps {
  name: string;
  category: ListItemPropsCategory[];
  days: ListDayProps[];
  sent: boolean;
}
import { FaCheck } from 'react-icons/fa6';
import { FcCancel } from 'react-icons/fc';
// import { useState } from 'react';
import { Fragment } from 'react';
export const List: React.FC<ListItemProps[]> = (props) => {
  // const [selected, setSelected] = useState<string[]>([]);
  // function handleClick(e: ChangeEvent<HTMLInputElement>) {
  //   if (selected.includes(e.target.value)) {
  //     setSelected(selected.filter((item) => item !== e.target.value));
  //   } else {
  //     setSelected([...selected, e.target.value]);
  //   }
  // }
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
            <th>
              <div className="flex items-center justify-center">Үнэлгээ</div>
            </th>
            <th>
              <div className="flex items-center justify-center">Ирц</div>
            </th>
            <th>
              <div className="flex items-center justify-center">Төлөв</div>
            </th>
            <th>
              <div className="flex items-center justify-center">Илгээсэн</div>
            </th>
          </tr>
        </thead>
        <tbody className="h-1/2">
          {/* row 1 */}
          {items.map((item: ListItemProps, index: number) => (
            <Fragment key={index}>
              <tr>
                <th rowSpan={item.category.length} className="w-[3vw]">
                  {index + 1}
                </th>
                <th rowSpan={item.category.length} className="w-[10vw]">
                  {item.name}
                </th>
                <td className="w-[12vw]">{item.category[0].name}</td>
                <td className="">
                  <textarea className="textarea textarea-bordered w-full" defaultValue={item.category[0].desc}></textarea>
                </td>
                <td className="w-[3vw]">
                  <div className="flex items-center">
                    <input type="number" className="grow input input-bordered" placeholder="0" defaultValue={item.category[0].grade} max={100} min={0} />
                  </div>
                </td>
                <td rowSpan={item.category.length} className="w-[1vw]">
                  <div className="flex justify-around flex-col h-auto gap-3">
                    {item.days.map((item: ListDayProps, index: number) => (
                      <div key={index} className="flex justify-center items-center gap-3">
                        <h1>{item.name.split('-')[1] + '/' + item.name.split('-')[2]}</h1>
                        <select defaultValue={item.status} className="select select-bordered">
                          <option value="P">Ирсэн</option>
                          <option value="S">Өвчтэй</option>
                          <option value="A">Байхгүй</option>
                          <option value="E">Excused</option>
                          <option value="L">Хоцорсон</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </td>
                <td rowSpan={item.category.length} className="w-[1vw]">
                  <div className="flex justify-center items-center">
                    <input type="checkbox" className="checkbox" value={index} alt="check" />
                  </div>
                </td>
                <td rowSpan={item.category.length} className="w-[1vw]">
                  <div className="flex justify-center items-center">{item.sent ? <FaCheck /> : <FcCancel />}</div>
                </td>
              </tr>
              {item.category.slice(1).map((item: ListItemPropsCategory, index: number) => (
                <tr key={'cat' + index}>
                  <td className="">{item.name}</td>
                  <td className="">
                    <textarea className="textarea textarea-bordered w-full" defaultValue={item.desc}></textarea>
                  </td>
                  <td className="w-[1vw]">
                    <div className="flex items-center">
                      <input type="number" className="grow input input-bordered" placeholder="0" defaultValue={item.grade} max={100} min={0} />
                    </div>
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
      {/* <h1 className="result-title">Бэлэн төлөвт орсон {selected.length} репорт</h1> */}
    </div>
  );
};
