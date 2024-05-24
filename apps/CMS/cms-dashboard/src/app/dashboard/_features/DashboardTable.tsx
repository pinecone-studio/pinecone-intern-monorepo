import { Article } from '../../../generated';
import ArticleEditButton from '../_components/ArticleEditButton';
import { ApolloError } from '@apollo/client';
import { ArticleDropDownMenuFeature } from './ArticleDropDownMenuFeature';

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
  if (loading)
    return (
      <div className="flex w-full justify-center py-8">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  if (error) return <div>error...{error.message}</div>;

  return (
    <div data-cy="dashboard-table-cy-id" className="flex w-full justify-center bg-white rounded-[10px] overflow-hidden">
      <div className="overflow-x-auto w-full min-w-[650px]">
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
          {!articles?.length ? (
            <p className="text-xl font-semibold p-8">Article not found</p>
          ) : (
            <tbody>
              {articles?.map(({ status, title, createdAt, category, id }, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <p className="text-[16px] text-textPrimary font-[600]">{title.slice(0, 32)}</p>
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
                      <div className="flex items-center">
                        <ArticleDropDownMenuFeature id={id as string} />
                        <ArticleEditButton id={id as string} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};
