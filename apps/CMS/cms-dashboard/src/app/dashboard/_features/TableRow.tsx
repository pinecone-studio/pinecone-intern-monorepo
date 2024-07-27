import { Article } from '@/generated';
import { format } from 'date-fns';
import { MdMoreVert } from 'react-icons/md';
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

const STATUS_COLORS: Record<string, string> = {
  PUBLISHED: '#C1E6CF',
  ARCHIVED: '#FDF4B6',
  DRAFT: '#ECEDF0',
  SCHEDULED: '#B7DDFF',
};

export const TableRow = (props: Article) => {
  const { status, title, createdAt, category, _id } = props;

  return (
    <tr data-cy="tablerow-test-cy" className="border-b-2">
      <td className="p-4">
        <p className="text-[16px] text-textPrimary font-[600] truncate">{title}</p>
      </td>
      <td className="flex items-center justify-center p-4">
        <p
          className="font-[400] text-[14px] py-1 px-2 rounded-[30px]"
          style={{
            backgroundColor: STATUS_COLORS[status],
          }}
        >
          {ARTICLE_ENUM[status as keyof ArticleStatusType]}
        </p>
      </td>
      <td className="p-4">
        <p className="font-[400] text-[14px] whitespace-nowrap flex justify-center">{format(new Date(createdAt), 'dd.MM.yyyy')}</p>
      </td>
      <td className="p-4">
        <div className="rounded-[30px] w-fit bg-[#ECEDF0]">
          <p className="font-[400] text-[14px] text-[#1F2126] py-[2px] px-3">{category.map((cat) => cat.name).join(', ')}</p>
        </div>
      </td>
      <td className="p-4">
        <div className="w-18 h-10 flex flex-row justify-center items-center">
          <button data-cy="MdMoreVert-button-test-cy" className="w-5 h-5">
            <MdMoreVert />
          </button>
          <button data-cy="ArticleEditButton-test-cy" className="w-5 h-5">
            <ArticleEditButton id={_id as string} />
          </button>
        </div>
      </td>
    </tr>
  );
};
