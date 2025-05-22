import { FC } from 'react';

type TicketOption = {
  type: string;
  count: number;
  price: number;
  formattedPrice: string;
  color: string;
  selected: number;
};

export const TotalPriceBreakdown: FC<{ options: TicketOption[] }> = ({ options }) => {
  const totalPrice = options.reduce((sum, opt) => sum + opt.selected * opt.price, 0);

  return options.some((opt) => opt.selected > 0) ? (
    <div className="space-y-2">
      {options.map(
        (opt) =>
          opt.selected > 0 && (
            <div key={opt.type} className="flex justify-between text-white text-sm">
              <span>
                {opt.type} x {opt.selected}
              </span>
              <span>{(opt.selected * opt.price).toLocaleString('mn-MN')}₮</span>
            </div>
          )
      )}
      <div className="flex justify-between text-white font-semibold text-lg border-t border-gray-600 pt-2">
        <span>Нийт төлбөр:</span>
        <span>{totalPrice.toLocaleString('mn-MN')}₮</span>
      </div>
    </div>
  ) : null;
};
