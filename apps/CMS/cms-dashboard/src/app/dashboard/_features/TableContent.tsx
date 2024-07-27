import { Article } from '../../../generated';
import { ApolloError } from '@apollo/client';
import { TableRow } from './TableRow';

type TableContentProps = {
  articles: Article[] | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

export const TableContent = ({ articles, loading }: TableContentProps) => {
  if (loading) {
    return (
      <div data-cy="loading-indicator" className="flex w-full justify-center py-8">
        <span className="loading loading-bars loading-lg text-gray-500"></span>
      </div>
    );
  }

  const hasArticles = Array.isArray(articles) && articles.length > 0;

  return (
    <table data-cy="table-content-cy-id" className="table overflow-x-visible min-w-[650px] bg-white rounded-[8px] border-collapse table-fixed">
      <thead>
        <tr className="border-b-2">
          <th data-cy="tableHeader-0" className="flex justify-start p-4 w-[40%] font-normal">
            Нийтлэл
          </th>
          <th data-cy="tableHeader-1" className="p-4 font-normal">
            Статус
          </th>
          <th data-cy="tableHeader-2" className="p-4 font-normal">
            Огноо
          </th>
          <th data-cy="tableHeader-3" className="p-4 font-normal">
            Шошго
          </th>
          <th data-cy="tableHeader-4" className="text-right font-normal"></th>
        </tr>
      </thead>
      <tbody>
        {hasArticles ? (
          articles.map((item) => <TableRow {...item} key={item._id} />)
        ) : (
          <tr>
            <td colSpan={5} className="text-xl font-semibold p-8 text-center">
              Article not found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
