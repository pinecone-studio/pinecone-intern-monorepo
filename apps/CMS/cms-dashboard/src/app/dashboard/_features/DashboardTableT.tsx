import { Article } from '../../../generated';
import { EditButtonSvg } from '../../assets/EditButtonSvg';
import ArticleMenuButton from '../_components/ArticleMenuButton';

const tableItems = ['Огноо', 'Статус', 'Ангилал'];

type DashboardTableProps = {
  articles: Article[] | undefined;
};

const DashboardTableT = (props: DashboardTableProps) => {
  const { articles } = props;

  return (
    <div className="flex w-full justify-center">
      <div className="overflow-x-auto w-[1000px] min-w-[650px] flex border rounded">
        <table className="table">
          <thead>
            <tr>
              <th>
                <p className="font-[600] text-[14px] text-[#3F4145]">Нийтлэл</p>
              </th>
              {tableItems.map((items, index) => {
                return (
                  <th key={index}>
                    <div className="flex">
                      <p className="font-[600] text-[14px] text-[#3F4145] ml-4">{items}</p>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {articles?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <p className="text-[16px] text-textPrimary font-[600] whitespace-nowrap">{item.title}</p>
                  </td>
                  <td>
                    <div className="flex justify-center border rounded-[30px] ml-3 w-fit">
                      <p className="font-[400] text-[14px] py-[2px] px-2">{item.status}</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <p className="font-[400] text-[14px] whitespace-nowrap">{item.createdAt.slice(0, 10)}</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center border rounded-[30px] w-fit ml-3 bg-[#ECEDF0]">
                      <p className="font-[400] text-[14px] text-[#1F2126] py-[2px] px-2">{item.category.name}</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <ArticleMenuButton id={item.id} />
                      <EditButtonSvg />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardTableT;
