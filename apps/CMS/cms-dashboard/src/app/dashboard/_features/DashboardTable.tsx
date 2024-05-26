import { Article } from '../../../generated';
import { ApolloError } from '@apollo/client';
import { TableRowFeature } from './TableRowFeature';
import { TableHead } from '../_components/TableHead';

const tableHeadWords = ['Нийтлэл', 'Статус', 'Огноо', 'Ангилал'];

type DashboardTableProps = {
  articles: Article[] | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

export const DashboardTable = (props: DashboardTableProps) => {
  const { articles, loading, error } = props;
  if (loading)
    return (
      <div className="flex w-full justify-center py-8">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  if (error) return <div>error...{error.message}</div>;

  return (
    <table data-cy="dashboard-table-cy-id" className="table overflow-x-visible w-full min-w-[650px] bg-white rounded-[8px]">
      <thead>
        <tr>
          {tableHeadWords.map((item, index) => {
            return <TableHead key={index} text={item} />;
          })}
        </tr>
      </thead>
      {!articles?.length ? (
        <tbody className="text-xl font-semibold p-8">
          <tr>
            <th>Article not found</th>
          </tr>
        </tbody>
      ) : (
        <tbody>
          {articles?.map((item) => {
            return <TableRowFeature {...item} key={item.id} />;
          })}
        </tbody>
      )}
    </table>
  );
};
