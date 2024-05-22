'use client';

import React, { useCallback, useState } from 'react';
import { LinkButtonIcon } from '@/icons';
import { MorevertButtonIcon } from '@/icons';
import { ArchiveButtonIcon } from '@/icons';
import { ArticleStatus, useUpdateArticleStatusByIdMutation } from '@/generated';
import { toast } from 'react-toastify';
import { ApolloError } from '@apollo/client';
import { ArchivedSuccessfullyModal } from '../_components/ArchivedSuccessfullyModal';
import { useRefetch } from '@/common/providers/RefetchProvider';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Tooltip, Typography } from '@mui/material';

export const ArticleDropDownMenuFeature = ({ id }: { id: string }) => {
  const [copied, setCopied] = useState(false);
  const [updateArticleStatusById] = useUpdateArticleStatusByIdMutation();
  const refetch = useRefetch();

  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickCopy = useCallback(async () => {
    setCopied(true);

    const domain = window.location.origin;

    await navigator.clipboard.writeText(`${domain}/articles/copy-article/${id}`);

    setTimeout(() => {
      setCopied(false);
    }, 1300);
  }, [id]);

  const archiveArticle = async () => {
    try {
      const { data } = await updateArticleStatusById({
        variables: {
          id,
          newStatus: ArticleStatus.Archived,
        },
      });

      const title = data?.updateArticleStatusById.title;

      toast(<ArchivedSuccessfullyModal title={title ?? ''} />, {
        progressStyle: { background: '#01E17B' },
        position: 'top-center',
        autoClose: 3000,
      });

      refetch();
    } catch (error) {
      if (error instanceof ApolloError) {
        toast.error(error.graphQLErrors[0].message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    }
  };

  return (
    <div className="relative dropdown">
      {/* <div data-testid="menu-button-test-id" data-cy="morevert-button-test-cy" tabIndex={0} role="button">
        <MorevertButtonIcon />
      </div> */}

      <IconButton data-testid="menu-button-test-id" sx={{ cursor: 'pointer' }} onClick={handleClick}>
        <MorevertButtonIcon />
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
              <ArchiveButtonIcon />
            </Stack>

            <Typography p={1}>Архив</Typography>
          </Stack>

          <Tooltip data-testid="copy-to-clipboard-id" arrow open={copied} title="Copied" onClick={() => handleClickCopy()}>
            <MenuItem>
              <ListItemIcon sx={{ color: '#000' }}>
                <LinkButtonIcon />
              </ListItemIcon>

              <ListItemText>Линк хуулах</ListItemText>
            </MenuItem>
          </Tooltip>
        </Stack>
      </Menu>

      {copied && <p className="text-slate-50 bg-[#8e8d8d] px-3 w-fit rounded-lg mt-2 ml-9 z-10">Copied</p>}
    </div>
  );
};
