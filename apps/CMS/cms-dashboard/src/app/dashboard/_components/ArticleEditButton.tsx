import { IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Link from 'next/link';

const ArticleEditButton = ({ id }: { id: string }) => {
  return (
    <Link href={`/articles/edit-article/${id}`} data-testid="article-edit-button-test-id" data-cy="article-edit-button-cy-id">
      <IconButton sx={{ cursor: 'pointer' }}>
        <EditOutlinedIcon sx={{ width: 22, height: 22 }} />
      </IconButton>
    </Link>
  );
};

export default ArticleEditButton;
