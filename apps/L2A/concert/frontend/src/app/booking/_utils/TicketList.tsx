import { FC } from 'react';
import { TicketOption } from '../[id]/_components/SeatSelection';

export const TicketList: FC<{
  options: TicketOption[];
  incrementQuantity: (_index: number) => void;
  decrementQuantity: (_index: number) => void;
}> = ({ options, incrementQuantity, decrementQuantity }) =>
  options.length > 0 ? (
    <div data-testid="ticket-list" className="space-y-4">
      {options.map((t, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-black rounded-lg border-2 border-dashed border-gray-600">
          <div className="flex items-center gap-3">
            <span className={`w-4 h-4 rounded-full ${t.color === 'text-white' ? 'bg-white' : t.color === 'text-pink-400' ? 'bg-pink-400' : 'bg-blue-400'}`} />
            <span className={`${t.color} text-sm`}>
              {t.type} ({t.count})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              data-testid={`minus-button-${i}`}
              onClick={() => decrementQuantity(i)}
              className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full text-white"
              disabled={t.selected === 0}
            >
              -
            </button>
            <span className="text-white w-6 text-center">{t.selected}</span>
            <button
              data-testid={`plus-button-${i}`}
              onClick={() => incrementQuantity(i)}
              className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full text-white"
              disabled={t.selected >= t.count}
            >
              +
            </button>
            <span className="text-white font-semibold text-sm">{t.formattedPrice}</span>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p data-testid="no-options" className="text-gray-400">
      Энд тасалбарын сонголт байхгүй байна
    </p>
  );
