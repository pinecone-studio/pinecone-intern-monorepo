'use client';

import React, { useCallback, useState } from 'react';
import { LinkButton } from '../../assets/LinkButtonSvg';
import { MorevertButton } from '../../assets/TableMorevertSvg';
import { ArchiveButton } from '../../assets/ArchiveButton';

const ArticleMenuButton = ({ id }: { id: string }) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setAnchorEl(true);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const handleClickCopy = useCallback(async () => {
    setCopied(true);

    const domain = window.location.origin;

    await navigator.clipboard.writeText(`${domain}/articles/edit-article/${id}`);

    setTimeout(() => {
      setCopied(false);
    }, 1300);
  }, [id]);

  return (
    <div className="relative dropdown">
      <div data-testid="menu-button-test-id" tabIndex={0} role="button" onClick={handleClick}>
        <MorevertButton />
      </div>

      <div className="absolute left-[-50px] top-8">
        {anchorEl && (
          <div
            onClick={() => {
              handleClose();
            }}
          >
            <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow rounded-xl border border-slate-200">
              <li data-testid="close-menu-button-test-id" className="z-10 bg-white">
                <a>
                  <ArchiveButton />
                  Архив
                </a>
              </li>

              <li
                data-testid="copy-clipboard-button-test-id"
                className="z-10 bg-white"
                onClick={() => {
                  handleClickCopy();
                }}
              >
                <a className="whitespace-nowrap">
                  <LinkButton />
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

export default ArticleMenuButton;
