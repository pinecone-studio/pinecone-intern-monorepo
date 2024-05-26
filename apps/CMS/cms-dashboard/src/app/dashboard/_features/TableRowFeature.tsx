import { Article } from '@/generated';
import { ArticleDropDownMenuFeature } from './ArticleDropDownMenuFeature';
import ArticleEditButton from '../_components/ArticleEditButton';

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
export const TableRowFeature = (props: Article) => {
  const { status, title, createdAt, category, id } = props;
  return (
    <tr>
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
};
