'use client';
type StatusTabProps = {
  selectedStatus: string;
  quantity: number | undefined;
  thisStatus: string;
};

type ArticleStatusType = {
  ALL: string;
  PUBLISHED: string;
  DRAFT: string;
  ARCHIVED: string;
  SCHEDULED: string;
};

const ArtileStatusEnum: ArticleStatusType = {
  ALL: 'Бүгд',
  PUBLISHED: 'Нийтэлсэн',
  DRAFT: 'Ноорог',
  ARCHIVED: 'Архив',
  SCHEDULED: 'Төлөвлөсөн',
};

export const StatusTab = ({ selectedStatus, quantity, thisStatus }: StatusTabProps) => {
  return (
    <div data-testid="status-tab-test-id" className="h-[100%] flex flex-col justify-center items-center" style={{ borderBottom: selectedStatus === thisStatus ? '2px solid black' : '' }}>
      <div className="flex flex-row gap-1 py-4 px-6">
        <p data-testid="status-name-test-id" className="text-[15px] font-semibold text-textSecondary" style={{ fontWeight: selectedStatus === thisStatus ? 'bold' : 'normal' }}>
          {ArtileStatusEnum[thisStatus as keyof ArticleStatusType]}
        </p>
        <p data-testid="status-quantity-test-id" className="text-textSecondary text-[14px] bg-tagGrayBackground px-2 rounded-[35px]">
          {quantity}
        </p>
      </div>
    </div>
  );
};
