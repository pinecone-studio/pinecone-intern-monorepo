'use client';

type ArticlesButtonProps = {
  text?: string;
  bgColor?: string | number;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  onClick?: () => void;
};
import { Button } from '@/components/ui/button';

export const ArticlesButton: React.FC<ArticlesButtonProps> = (props) => {
  const { text, bgColor, disabled, type, onClick } = props;
  return (
    <div>
      <Button onClick={onClick} disabled={disabled} className={`${bgColor} `} type={type} data-testid="create-article-button">
        {text}
      </Button> 
    </div>
  );
};
