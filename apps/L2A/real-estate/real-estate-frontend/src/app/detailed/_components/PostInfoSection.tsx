import { InfoItem } from "@/lib/typescripts";

const PostInfoSection = ({ items }: { items: InfoItem[] }) => (
  <div
    data-testid="info-section"
    className="grid grid-cols-2 gap-x-8 gap-y-4 border-t pt-6 mt-4"
  >
    {items.map(({ icon: Icon, label, value }, idx) => (
      <div key={idx} className="flex gap-4 items-center">
        <Icon className="w-4 h-4 shrink-0 opacity-30" />
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground whitespace-nowrap">{label}</span>
          <span className="text-sm font-medium text-black whitespace-nowrap">
            {value ?? '-'}
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default PostInfoSection;
