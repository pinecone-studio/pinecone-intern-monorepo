'use client';

import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Tooltip, Typography } from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import { useCallback, useState } from 'react';

const MenuButton = ({ id }: { id: string }) => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>();
  const [copied, setCopied] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickCopy = useCallback(async () => {
    setCopied(true);

    const domain = window.location.origin ?? '';

    await navigator.clipboard.writeText(`${domain}/articles/copy-article/${id}`);
  }, [id]);

  return (
    <Stack>
      <IconButton data-testid="morevert-button-test-id" sx={{ cursor: 'pointer' }} onClick={handleClick}>
        <MoreVertOutlinedIcon sx={{ width: 22, height: 22 }} />
      </IconButton>

      <Menu data-testid="drop-down-menu-test-id" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <Stack gap={0.2}>
          <Stack
            className={`close-test-class-name`}
            data-testid="close-button-menu-test-id"
            direction={'row'}
            px={2}
            alignItems={'center'}
            onClick={handleClose}
            sx={{
              '&:hover': {
                bgcolor: '#0000000A',
              },
            }}
          >
            <Stack data-testid="item-icon" sx={{ color: '#000' }}>
              <ArchiveOutlinedIcon />
            </Stack>

            <Typography p={1}>Архив</Typography>
          </Stack>

          <Tooltip data-testid="copy-to-clipboard-id" arrow open={copied} title="Copied" onClick={() => handleClickCopy()}>
            <MenuItem>
              <ListItemIcon sx={{ color: '#000' }}>
                <LinkOutlinedIcon />
              </ListItemIcon>

              <ListItemText>Линк хуулах</ListItemText>
            </MenuItem>
          </Tooltip>
        </Stack>
      </Menu>
    </Stack>
  );
};

export default MenuButton;
