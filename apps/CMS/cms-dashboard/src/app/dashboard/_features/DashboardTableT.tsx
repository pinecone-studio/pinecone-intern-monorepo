import { EditButton } from '../../assets/EditButtonSvg';
import { MorevertButton } from '../../assets/TableMorevertSvg';

const DashboardTableT = () => {
  return (
    <div className="overflow-x-auto w-[1000px] flex border-2">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>
              <div className="flex justify-center">
                <p className="font-[400] text-[14px]">Title 1</p>
              </div>
            </th>
            <th>
              <div className="flex justify-center">
                <p className="font-[400] text-[14px]">Title 2</p>
              </div>
            </th>
            <th>
              <div className="flex justify-center">
                <p className="font-[400] text-[14px]">Title 3</p>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <p className="text-[16px] text-textPrimary font-[600]">Ganderton</p>
            </td>
            <td>
              <div className="flex justify-center">
                <p className="font-[400] text-[14px]">Software</p>
              </div>
            </td>
            <td>
              <div className="flex justify-center">
                <p className="font-[400] text-[14px]">Software</p>
              </div>
            </td>
            <td>
              <div className="flex justify-center">
                <p className="font-[400] text-[14px]">Software</p>
              </div>
            </td>
            <td>
              <div className="flex justify-center">
                <MorevertButton />
                <EditButton />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTableT;
