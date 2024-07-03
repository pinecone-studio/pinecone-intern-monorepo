import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FC, ElementType } from 'react';

interface ActionLinkButtonProps {
  label: string;
  href: string;
  variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null | undefined;
  Icon?: ElementType;
}

export const ActionLinkButton: FC<ActionLinkButtonProps> = ({ label, href, variant, Icon }) => {
  return (
    <Link href={href} data-testid="action-link">
      <Button className="mt-5" variant={variant} data-testid="action-link-button">
        {Icon ? (
          <span data-testid="icon-svg">
            <Icon className="mr-2 h-4 w-4" />
          </span>
        ) : null}
        {label}
      </Button>
    </Link>
  );
};
