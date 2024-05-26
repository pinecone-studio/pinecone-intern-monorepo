'use client';

import React, { useCallback, useState } from 'react';
import { LinkButtonIcon } from '@/icons';
import { MorevertButtonIcon } from '@/icons';
import { ArchiveButtonIcon } from '@/icons';
import { ArticleStatus, useUpdateArticleStatusByIdMutation, useDeleteArticleByIdMutation, useGetArticleByIdQuery } from '@/generated';
import { ApolloError } from '@apollo/client';
import { useRefetch } from '@/common/providers/RefetchProvider';
import { DraftIcon } from '@/assets/icons/DraftIcon';
import { DroppedListItem } from '../_components/DroppedListItem';
import { PublishIcon } from '@/assets/icons/PublishIcon';
import { DeleteIcon } from '@/assets/icons/DeleteIcon';
import { showErrorToast, showToast } from '@/common/functions';

export const ArticleDropDownMenuFeature = ({ id }: { id: string }) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [copied, setCopied] = useState(false);
  const [updateArticleStatusById] = useUpdateArticleStatusByIdMutation();
  const [deleteArticleById] = useDeleteArticleByIdMutation();
  const { data: articleData } = useGetArticleByIdQuery({ variables: { getArticleByIdId: id } });
  const refetch = useRefetch();

  const handleClick = () => {
    setAnchorEl(true);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const copyLink = useCallback(async () => {
    setCopied(true);

    const domain = window.location.origin;

    await navigator.clipboard.writeText(`${domain}/articles/${id}`);

    setTimeout(() => {
      setCopied(false);
    }, 1300);
  }, [id]);

  const updateStatus = async ({ status }: { status: string }) => {
    if (articleData?.getArticleByID?.status === status) {
      showToast({ text: `It is already "${status}"` });
      return;
    }
    try {
      await updateArticleStatusById({
        variables: {
          id,
          newStatus: status,
        },
      });

      showToast({ text: `"${status}" successfully` });
      refetch();
    } catch (error) {
      if (error instanceof ApolloError) {
        showErrorToast({ errorMessage: error.graphQLErrors[0].message });
      }
    }
  };
  const deleteArticle = async () => {
    try {
      const { data } = await deleteArticleById({
        variables: {
          id,
        },
      });

      const message = data?.deleteArticleById.message;

      showToast({ text: `"${message}" successfully` });

      refetch();
    } catch (error) {
      if (error instanceof ApolloError) {
        showErrorToast({ errorMessage: error.graphQLErrors[0].message });
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
              updateStatus({ status: ArticleStatus.Published });
            }}
          />
          <DroppedListItem
            text="Ноороглох"
            icon={<DraftIcon />}
            testId="close-menu-button-test-id"
            onClick={() => {
              updateStatus({ status: ArticleStatus.Draft });
            }}
          />
          <DroppedListItem
            text="Архивлах"
            icon={<ArchiveButtonIcon />}
            testId="close-menu-button-test-id"
            onClick={() => {
              updateStatus({ status: ArticleStatus.Archived });
            }}
          />
          <DroppedListItem text="Устгах" icon={<DeleteIcon />} testId="close-menu-button-test-id" onClick={deleteArticle} />
          <DroppedListItem text="Линк хуулах" icon={<LinkButtonIcon />} testId="copy-clipboard-button-test-id" onClick={copyLink} />
        </ul>
      )}
      {copied && <p className="text-textPrimary bg-white px-3 border-2  rounded-lg absolute top-[100%] left-0">Copied</p>}
    </div>
  );
};
