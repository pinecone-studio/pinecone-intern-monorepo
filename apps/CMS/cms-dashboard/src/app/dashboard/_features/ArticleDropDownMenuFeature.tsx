'use client';

import React, { useCallback, useState } from 'react';
import { LinkButtonIcon } from '@/icons';
import { MorevertButtonIcon } from '@/icons';
import { ArchiveButtonIcon } from '@/icons';
import { ArticleStatus, useUpdateArticleStatusByIdMutation } from '@/generated';
import { toast } from 'react-toastify';
import { ApolloError } from '@apollo/client';
import { StatusChangedModal } from '../_components/StatusChangedModal';
import { useRefetch } from '@/common/providers/RefetchProvider';
import { DraftIcon } from '@/assets/icons/DraftIcon';
import { DroppedListItem } from '../_components/DroppedListItem';
import { PublishIcon } from '@/assets/icons/PublishIcon';

export const ArticleDropDownMenuFeature = ({ id }: { id: string }) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [copied, setCopied] = useState(false);
  const [updateArticleStatusById] = useUpdateArticleStatusByIdMutation();
  const refetch = useRefetch();

  const handleClick = () => {
    setAnchorEl(true);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const handleClickCopy = useCallback(async () => {
    setCopied(true);

    const domain = window.location.origin;

    await navigator.clipboard.writeText(`${domain}/articles/${id}`);

    setTimeout(() => {
      setCopied(false);
    }, 1300);
  }, [id]);
  const archiveArticle = async ({ status }: { status: string }) => {
    try {
      const { data } = await updateArticleStatusById({
        variables: {
          id,
          newStatus: status,
        },
      });

      const title = data?.updateArticleStatusById.title;

      toast(<StatusChangedModal title={title ?? ''} status={status} />, {
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
    <div className="dropdown  dropdown-top relative">
      <div onClick={handleClick} tabIndex={0} role="button" data-testid="menu-button-test-id" data-cy="morevert-button-test-cy">
        <MorevertButtonIcon />
      </div>
      {anchorEl && (
        <ul onClick={handleClose} data-cy="drop-down-menu-test-cy" tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <DroppedListItem
            text="Нийтлэx"
            icon={<PublishIcon />}
            testId="close-menu-button-test-id"
            onClick={() => {
              archiveArticle({ status: ArticleStatus.Published });
            }}
          />
          <DroppedListItem
            text="Ноороглох"
            icon={<DraftIcon />}
            testId="close-menu-button-test-id"
            onClick={() => {
              archiveArticle({ status: ArticleStatus.Draft });
            }}
          />
          <DroppedListItem
            text="Архивлах"
            icon={<ArchiveButtonIcon />}
            testId="close-menu-button-test-id"
            onClick={() => {
              archiveArticle({ status: ArticleStatus.Archived });
            }}
          />
          <DroppedListItem text="Линк хуулах" icon={<LinkButtonIcon />} testId="copy-clipboard-button-test-id" onClick={handleClickCopy} />
        </ul>
      )}
      {copied && <p className="text-textPrimary bg-white px-3 border-2  rounded-lg absolute top-[100%] left-0">Copied</p>}
    </div>
  );
};
