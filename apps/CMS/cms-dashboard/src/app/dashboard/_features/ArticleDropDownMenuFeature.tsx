'use client';

import React, { useCallback, useState } from 'react';
import { LinkButtonIcon } from '@/icons';
import { MorevertButtonIcon } from '@/icons';
import { ArchiveButtonIcon } from '@/icons';
import { ArticleStatus, useGetArticleByIdQuery, useUpdateArticleStatusByIdMutation } from '@/generated';
import { toast } from 'react-toastify';
import { ApolloError } from '@apollo/client';
import { ArchivedSuccessfullyModal } from '../_components/ArchivedSuccessfullyModal';
import { useRefetch } from '@/common/providers/RefetchProvider';

export const ArticleDropDownMenuFeature = ({ id }: { id: string }) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [copied, setCopied] = useState(false);
  const [updateArticleStatusById] = useUpdateArticleStatusByIdMutation();
  const { data } = useGetArticleByIdQuery({ variables: { getArticleByIdId: id } });

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

    await navigator.clipboard.writeText(`${domain}/articles/copy-article/${id}`);

    setTimeout(() => {
      setCopied(false);
    }, 1300);
  }, [id]);

  const archiveArticle = async () => {
    if (data?.getArticleByID?.status === 'ARCHIVED') {
      toast.success(`Looks like it's already archived !`, {
        progressStyle: { background: '#01E17B' },
        position: 'top-center',
        autoClose: 3000,
        style:{
          color:"black"
        }
      });
      return;
    }

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
      <div data-testid="menu-button-test-id" data-cy="morevert-button-test-cy" tabIndex={0} role="button" onClick={handleClick}>
        <MorevertButtonIcon />
      </div>

      <div className="absolute left-[-50px] top-8">
        {anchorEl && (
          <div onClick={handleClose} data-cy="drop-down-menu-test-cy">
            <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow rounded-xl border border-slate-200">
              <li onClick={archiveArticle} data-testid="close-menu-button-test-id" className="z-10 bg-white">
                <a>
                  <ArchiveButtonIcon />
                  Архив
                </a>
              </li>

              <li data-testid="copy-clipboard-button-test-id" className="z-10 bg-white" onClick={handleClickCopy}>
                <a className="whitespace-nowrap">
                  <LinkButtonIcon />
                  Линк хуулах
                </a>
              </li>
            </ul>
          </div>
        )}

        {copied && <p className="text-slate-50 bg-[#8e8d8d] px-3 w-fit rounded-lg mt-2 ml-9 z-10">Copied</p>}
      </div>
    </div>
  );
};
