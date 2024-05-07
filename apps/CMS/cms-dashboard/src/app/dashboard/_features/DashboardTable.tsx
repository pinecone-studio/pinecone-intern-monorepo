import { Article } from '../../../generated';
import { ArticleMenuButton } from '../_components/ArticleMenuButton';
import { EditButtonIcon } from '@/icons';
import { ApolloError } from '@apollo/client';

const tableItems = ['Огноо', 'Статус', 'Ангилал'];

type DashboardTableProps = {
  articles: Article[] | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

type ArticleStatusType = {
  PUBLISHED: string;
  DRAFT: string;
  ARCHIVED: string;
  SCHEDULED: string;
};

const ARTICLE_ENUM: ArticleStatusType = {
  PUBLISHED: 'Нийтэлсэн',
  DRAFT: 'Ноорог',
  ARCHIVED: 'Архив',
  SCHEDULED: 'Төлөвлөсөн',
};

const getColorForStatus = (status: string) => {
  switch (status) {
    case 'PUBLISHED':
      return '#C1E6CF';
    case 'ARCHIVED':
      return '#FDF4B6';
    case 'DRAFT':
      return '#ECEDF0';
    case 'SCHEDULED':
      return '#B7DDFF';
    default:
      return '';
  }
};

export const DashboardTable = (props: DashboardTableProps) => {
  const { articles, loading, error } = props;
  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;
  return (
    <div data-cy="dashboard-table-cy-id" className="flex w-full justify-center bg-white rounded-[10px] overflow-hidden">
      <div className="overflow-x-auto w-full min-w-[650px] flex border">
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
                      <p className="font-[600] text-[14px] text-[#3F4145] py-1">{items}</p>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {articles?.map(({ status, title, createdAt, category, id }, index) => {
              return (
                <tr key={index}>
                  <td>
                    <p className="text-[16px] text-textPrimary font-[600] whitespace-nowrap">{title}</p>
                  </td>
                  <td>
                    <p
                      className="font-[400] text-[14px] py-[2px] px-2 rounded-[30px] w-fit"
                      style={{
                        backgroundColor: getColorForStatus(status),
                      }}
                    >
                      {ARTICLE_ENUM[status as keyof ArticleStatusType]}
                    </p>
                  </td>
                  <td>
                    <p className="font-[400] text-[14px] whitespace-nowrap">{createdAt.slice(0, 10)}</p>
                  </td>
                  <td>
                    <div className="rounded-[30px] w-fit bg-[#ECEDF0]">
                      <p className="font-[400] text-[14px] text-[#1F2126] py-[2px] px-3">{category.name}</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <ArticleMenuButton id={id as string} />
                      <EditButtonIcon />
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
