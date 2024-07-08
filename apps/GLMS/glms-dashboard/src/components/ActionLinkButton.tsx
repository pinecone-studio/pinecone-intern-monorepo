import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FC, ElementType, MouseEvent } from 'react';

interface ActionLinkButtonProps {
  label: string;
  href: string;
  variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null | undefined;
  Icon?: ElementType;
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void; // Adjusted for Button component
}

export const ActionLinkButton: FC<ActionLinkButtonProps> = ({ href, label, variant, Icon }) => {
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
