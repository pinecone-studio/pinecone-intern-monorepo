import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

const ServiceCategory = ({ label, services }: { label: string; services: string[] }) => (
  <div className="ml-2" data-testid={`service-category-${label}`} data-cy={`service-category-display-${label.toLowerCase().replace(/\s+/g, '-')}`}>
    <h6 className="text-sm text-gray-500 mb-2">{label}</h6>
    {services.length > 0 ? (
      <div className="flex flex-wrap w-[21rem] max-h-24 gap-1">
        {services.map((service) => (
          <Badge key={service} variant="secondary" className="text-xs" data-testid={`service-badge-${service}`} data-cy={`service-badge-${service.toLowerCase().replace(/\s+/g, '-')}`}>
            {service}
          </Badge>
        ))}
      </div>
    ) : (
      <p className="text-sm text-gray-500" data-cy={`no-services-${label.toLowerCase().replace(/\s+/g, '-')}`}>
        -/-
      </p>
    )}
  </div>
);

const ServiceInput = ({
  label,
  services,
  value,
  onChange,
  onAdd,
  onRemove,
}: {
  label: string;
  services: string[];
  value: string;
  onChange: (_value: string) => void;
  onAdd: () => void;
  onRemove: (_service: string) => void;
}) => (
  <div className="flex flex-col gap-2" data-testid={`service-input-${label}`} data-cy={`service-input-${label.toLowerCase().replace(/\s+/g, '-')}`}>
    <Label>{label}</Label>
    <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md min-h-10">
      {services.map((service) => (
        <Badge key={service} variant="secondary" className="flex items-center gap-1 pr-1.5" data-testid={`badge-${service}`} data-cy={`service-badge-${service.toLowerCase().replace(/\s+/g, '-')}`}>
          {service}
          <button
            onClick={() => onRemove(service)}
            className="rounded-full hover:bg-gray-300 p-0.5"
            data-testid={`remove-service-${service}`}
            data-cy={`remove-service-${service.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onAdd()}
        placeholder={services.length ? '' : `Add ${label.toLowerCase()}...`}
        className="flex-1 min-w-[100px] outline-none bg-transparent text-sm"
        data-testid={`service-input-field-${label}`}
        data-cy={`service-input-field-${label.toLowerCase().replace(/\s+/g, '-')}`}
      />
    </div>
  </div>
);
export { ServiceCategory, ServiceInput };
