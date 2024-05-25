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
import { DraftIcon } from '@/assets/icons/DraftIcon';
import { DroppedListItem } from '../_components/DroppedListItem';
import { PublishIcon } from '@/assets/icons/PublishIcon';
import { DeleteIcon } from '@/assets/icons/DeleteIcon';

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
    <div className="dropdown  dropdown-top relative">
      <div onClick={handleClick} tabIndex={0} role="button" data-testid="menu-button-test-id" data-cy="morevert-button-test-cy">
        <MorevertButtonIcon />
      </div>
      {anchorEl && (
        <ul onClick={handleClose} data-cy="drop-down-menu-test-cy" tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <DroppedListItem text="Нийтлэx" icon={<PublishIcon />} testId="close-menu-button-test-id" onClick={archiveArticle} />
          <DroppedListItem text="Ноороглох" icon={<DraftIcon />} testId="close-menu-button-test-id" onClick={archiveArticle} />
          <DroppedListItem text="Архивлах" icon={<ArchiveButtonIcon />} testId="close-menu-button-test-id" onClick={archiveArticle} />
          <DroppedListItem text="Устгах" icon={<DeleteIcon />} testId="close-menu-button-test-id" onClick={archiveArticle} />
          <DroppedListItem text="Линк хуулах" icon={<LinkButtonIcon />} testId="copy-clipboard-button-test-id" onClick={handleClickCopy} />
        </ul>
      )}
      {copied && <p className="text-textPrimary bg-white px-3 border-2  rounded-lg absolute top-[100%] left-0">Copied</p>}
    </div>
    // <div className="relative dropdown">
    //   <div data-testid="menu-button-test-id" data-cy="morevert-button-test-cy" tabIndex={0} role="button" onClick={handleClick}>
    //     <MorevertButtonIcon />
    //   </div>

    //   {anchorEl && (
    //     <div onClick={handleClose} data-cy="drop-down-menu-test-cy">
    //       <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-xl border border-slate-200">
    //         <li onClick={archiveArticle} data-testid="close-menu-button-test-id" className="z-10 bg-white">
    //           <a>
    //             <ArchiveButtonIcon />
    //             Архив
    //           </a>
    //         </li>

    //         <li data-testid="copy-clipboard-button-test-id" className="z-10 bg-white" onClick={handleClickCopy}>
    //           <a className="whitespace-nowrap">
    //             <LinkButtonIcon />
    //             Линк хуулах
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   )}

    //   {copied && <p className="text-slate-50 bg-[#8e8d8d] px-3 w-fit rounded-lg mt-2 ml-9 z-10">Copied</p>}
    // </div>
  );
};
