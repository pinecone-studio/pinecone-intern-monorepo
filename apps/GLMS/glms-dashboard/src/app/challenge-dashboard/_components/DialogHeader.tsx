import { DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type DialogHeaderType = {
  title: String;
  onClose: () => void;
};

export const DialogHeader = ({ title, onClose }: DialogHeaderType) => {
  return (
    <div style={{ padding: '4px 15px 8px 15px' }}>
      <DialogTitle sx={{ fontWeight: 700, fontSize: 24 }}>{title}</DialogTitle>
      <IconButton data-testid="challenge-close-btn" aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 20, top: 20, color: (theme) => theme.palette.grey[500] }}>
        <CloseIcon />
      </IconButton>
    </div>
  );
};
