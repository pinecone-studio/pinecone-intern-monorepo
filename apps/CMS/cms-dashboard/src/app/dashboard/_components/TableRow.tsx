type TableRowType = {
  number: number;
  name: string;
  job: string;
  color: string;
};
export const TableRow = (props: TableRowType) => {
  const { name, number, color, job } = props;
  return (
    <tr>
      <th>{number}</th>
      <td>{name}</td>
      <td>{job}</td>
      <td>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            Click
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};
